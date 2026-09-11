import { useEffect, useRef } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from 'three';

/**
 * Hero background: a drifting 3D graph of nodes and edges.
 *
 * Edges are wired once to each node's nearest neighbours and then kept, so the
 * mesh reads as a stable network rather than flickering proximity noise — and
 * per frame we only rewrite position buffers, never recompute topology.
 *
 * The cursor acts as a temporary node: the nearest points within a radius wire
 * up to it each frame and fade with distance, so it reads as a star burst that
 * follows the mouse.
 *
 * Only mounted by Hero when WebGL is available, motion is allowed and the
 * viewport is desktop-sized; it is decorative and always aria-hidden.
 */

const PALETTE = ['#4F8CFF', '#9B5CFF', '#22D3EE'];
const NEIGHBOURS = 2;
const SPREAD_X = 34;
const SPREAD_Y = 20;
const DEPTH = 30;

/** Cursor star: how many points may link to it, and how far it reaches. */
const MAX_LINKS = 12;
const LINK_RADIUS = 16;
/** Colour at the cursor end of each link — near-white so the centre reads hot. */
const LINK_TIP = [0.78, 0.9, 1];
/** How much of the node's colour survives at the far end; low values taper the
 *  line out so it dissolves into the mesh rather than ending on a hard point. */
const LINK_TAIL = 0.12;

const VERTEX_SHADER = /* glsl */ `
  attribute vec3 aColor;
  attribute float aSize;
  uniform float uFadeNear;
  uniform float uFadeFar;
  varying vec3 vColor;
  varying float vFade;

  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float depth = -mv.z;
    vFade = 1.0 - smoothstep(uFadeNear, uFadeFar, depth);
    gl_PointSize = aSize * (260.0 / max(depth, 0.001));
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d) * vFade;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

function nodeCount(width: number) {
  if (width < 1024) return 90;
  if (width < 1440) return 130;
  return 170;
}

const HeroMesh = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      return; // context creation can still fail on constrained devices
    }

    let width = container.clientWidth || 1;
    let height = container.clientHeight || 1;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const scene = new Scene();
    const camera = new PerspectiveCamera(55, width / height, 0.1, 200);
    camera.position.set(0, 0, 34);

    const group = new Group();
    scene.add(group);

    // ---- nodes -------------------------------------------------------------
    const count = nodeCount(width);
    const base = new Float32Array(count * 3);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    const palette = PALETTE.map((hex) => new Color(hex));

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * SPREAD_X * 2;
      const y = (Math.random() - 0.5) * SPREAD_Y * 2;
      const z = -Math.random() * DEPTH;
      base[i * 3] = positions[i * 3] = x;
      base[i * 3 + 1] = positions[i * 3 + 1] = y;
      base[i * 3 + 2] = positions[i * 3 + 2] = z;

      const c = palette[(Math.random() * palette.length) | 0];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 1.6 + Math.random() * 2.6;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.18 + Math.random() * 0.28;
    }

    const pointGeo = new BufferGeometry();
    const positionAttr = new BufferAttribute(positions, 3);
    positionAttr.setUsage(35048 /* DynamicDrawUsage */);
    pointGeo.setAttribute('position', positionAttr);
    pointGeo.setAttribute('aColor', new BufferAttribute(colors, 3));
    pointGeo.setAttribute('aSize', new BufferAttribute(sizes, 1));

    const pointMat = new ShaderMaterial({
      uniforms: { uFadeNear: { value: 22 }, uFadeFar: { value: 68 } },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    group.add(new Points(pointGeo, pointMat));

    // ---- edges: nearest neighbours, wired once -----------------------------
    const pairs = new Set<string>();
    const edges: number[] = [];
    for (let i = 0; i < count; i++) {
      const best: { index: number; dist: number }[] = [];
      for (let j = 0; j < count; j++) {
        if (i === j) continue;
        const dx = base[i * 3] - base[j * 3];
        const dy = base[i * 3 + 1] - base[j * 3 + 1];
        const dz = base[i * 3 + 2] - base[j * 3 + 2];
        const dist = dx * dx + dy * dy + dz * dz;
        if (best.length < NEIGHBOURS) {
          best.push({ index: j, dist });
          best.sort((a, b) => a.dist - b.dist);
        } else if (dist < best[best.length - 1].dist) {
          best[best.length - 1] = { index: j, dist };
          best.sort((a, b) => a.dist - b.dist);
        }
      }
      for (const { index: j } of best) {
        const key = i < j ? `${i}:${j}` : `${j}:${i}`;
        if (pairs.has(key)) continue;
        pairs.add(key);
        edges.push(i, j);
      }
    }

    const edgeCount = edges.length / 2;
    const linePositions = new Float32Array(edgeCount * 6);
    const lineColors = new Float32Array(edgeCount * 6);
    for (let e = 0; e < edgeCount; e++) {
      for (let end = 0; end < 2; end++) {
        const n = edges[e * 2 + end];
        lineColors[e * 6 + end * 3] = colors[n * 3];
        lineColors[e * 6 + end * 3 + 1] = colors[n * 3 + 1];
        lineColors[e * 6 + end * 3 + 2] = colors[n * 3 + 2];
      }
    }

    const lineGeo = new BufferGeometry();
    const linePosAttr = new BufferAttribute(linePositions, 3);
    linePosAttr.setUsage(35048);
    lineGeo.setAttribute('position', linePosAttr);
    lineGeo.setAttribute('color', new BufferAttribute(lineColors, 3));

    const lineMat = new LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    group.add(new LineSegments(lineGeo, lineMat));

    // ---- cursor star: links + hot centre ------------------------------------
    // Buffers are allocated once at max size; each frame we fill the part we
    // use and clamp drawRange, so no allocation happens in the loop.
    const starPositions = new Float32Array(MAX_LINKS * 6);
    const starColors = new Float32Array(MAX_LINKS * 6);
    const starGeo = new BufferGeometry();
    const starPosAttr = new BufferAttribute(starPositions, 3);
    const starColorAttr = new BufferAttribute(starColors, 3);
    starPosAttr.setUsage(35048);
    starColorAttr.setUsage(35048);
    starGeo.setAttribute('position', starPosAttr);
    starGeo.setAttribute('color', starColorAttr);
    starGeo.setDrawRange(0, 0);

    const starMat = new LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    group.add(new LineSegments(starGeo, starMat));

    // Single bright point sitting under the cursor.
    const coreGeo = new BufferGeometry();
    const corePos = new Float32Array(3);
    const corePosAttr = new BufferAttribute(corePos, 3);
    corePosAttr.setUsage(35048);
    coreGeo.setAttribute('position', corePosAttr);
    const coreColor = new Float32Array(LINK_TIP);
    const coreColorAttr = new BufferAttribute(coreColor, 3);
    coreColorAttr.setUsage(35048);
    coreGeo.setAttribute('aColor', coreColorAttr);
    coreGeo.setAttribute('aSize', new BufferAttribute(new Float32Array([7]), 1));
    coreGeo.setDrawRange(0, 0);
    group.add(new Points(coreGeo, pointMat));

    // ---- interaction + loop ------------------------------------------------
    const pointer = { x: 0, y: 0 };          // normalised, for camera parallax
    const client = { x: 0, y: 0, seen: false }; // raw, for cursor projection
    let linkStrength = 0;                     // eases the star in and out

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
      client.x = e.clientX;
      client.y = e.clientY;
      client.seen = true;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onPointerLeave = () => {
      client.seen = false;
    };
    document.addEventListener('pointerleave', onPointerLeave);

    const cursorLocal = new Vector3();
    const ray = new Vector3();
    const nearest: { index: number; dist: number }[] = [];

    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    io.observe(container);

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && onScreen) start();
      else stop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const resizeObserver = new ResizeObserver(() => {
      width = container.clientWidth || 1;
      height = container.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    });
    resizeObserver.observe(container);

    let frame = 0;
    let running = false;
    const startedAt = performance.now();

    const tick = (now: number) => {
      // Idle out while the hero is scrolled away — this is a very tall page.
      if (!onScreen) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const t = (now - startedAt) / 1000;

      for (let i = 0; i < count; i++) {
        const p = phases[i];
        const s = speeds[i];
        positions[i * 3] = base[i * 3] + Math.sin(t * s + p) * 1.5;
        positions[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * s * 0.8 + p) * 1.2;
        positions[i * 3 + 2] = base[i * 3 + 2] + Math.sin(t * s * 0.6 + p * 1.3) * 1.1;
      }
      positionAttr.needsUpdate = true;

      for (let e = 0; e < edgeCount; e++) {
        for (let end = 0; end < 2; end++) {
          const n = edges[e * 2 + end];
          linePositions[e * 6 + end * 3] = positions[n * 3];
          linePositions[e * 6 + end * 3 + 1] = positions[n * 3 + 1];
          linePositions[e * 6 + end * 3 + 2] = positions[n * 3 + 2];
        }
      }
      linePosAttr.needsUpdate = true;

      group.rotation.y = Math.sin(t * 0.05) * 0.18;
      group.rotation.x = Math.cos(t * 0.04) * 0.09;

      camera.position.x += (pointer.x * 3.4 - camera.position.x) * 0.035;
      camera.position.y += (pointer.y * 2.2 - camera.position.y) * 0.035;
      camera.lookAt(0, 0, -DEPTH / 2);
      camera.updateMatrixWorld();
      group.updateMatrixWorld();

      // --- cursor star ------------------------------------------------------
      const rect = container.getBoundingClientRect();
      const inside =
        client.seen &&
        client.x >= rect.left &&
        client.x <= rect.right &&
        client.y >= rect.top &&
        client.y <= rect.bottom;
      linkStrength += ((inside ? 1 : 0) - linkStrength) * 0.12;

      let used = 0;
      if (linkStrength > 0.01) {
        // Screen point -> world ray -> the plane the mesh sits on, then into
        // the group's local space so it can be compared with the raw buffer.
        const ndcX = ((client.x - rect.left) / rect.width) * 2 - 1;
        const ndcY = -(((client.y - rect.top) / rect.height) * 2 - 1);
        ray.set(ndcX, ndcY, 0.5).unproject(camera).sub(camera.position).normalize();
        const planeZ = -DEPTH / 2;
        cursorLocal
          .copy(camera.position)
          .addScaledVector(ray, (planeZ - camera.position.z) / ray.z);
        group.worldToLocal(cursorLocal);

        corePos[0] = cursorLocal.x;
        corePos[1] = cursorLocal.y;
        corePos[2] = cursorLocal.z;
        for (let i = 0; i < 3; i++) coreColor[i] = LINK_TIP[i] * linkStrength;
        corePosAttr.needsUpdate = true;
        coreColorAttr.needsUpdate = true;
        coreGeo.setDrawRange(0, 1);

        nearest.length = 0;
        for (let i = 0; i < count; i++) {
          const dx = positions[i * 3] - cursorLocal.x;
          const dy = positions[i * 3 + 1] - cursorLocal.y;
          const dz = positions[i * 3 + 2] - cursorLocal.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist > LINK_RADIUS) continue;
          if (nearest.length < MAX_LINKS) {
            nearest.push({ index: i, dist });
            nearest.sort((a, b) => a.dist - b.dist);
          } else if (dist < nearest[nearest.length - 1].dist) {
            nearest[nearest.length - 1] = { index: i, dist };
            nearest.sort((a, b) => a.dist - b.dist);
          }
        }

        for (const { index: n, dist } of nearest) {
          // Additive blending has no per-line alpha, so both fades are baked
          // into vertex colour: squared distance falloff so links dim well
          // before the radius edge, and a dark node end so each line tapers
          // out along its length instead of stopping abruptly on a point.
          const t = 1 - dist / LINK_RADIUS;
          const falloff = t * t * linkStrength;
          const o = used * 6;
          starPositions[o] = cursorLocal.x;
          starPositions[o + 1] = cursorLocal.y;
          starPositions[o + 2] = cursorLocal.z;
          starPositions[o + 3] = positions[n * 3];
          starPositions[o + 4] = positions[n * 3 + 1];
          starPositions[o + 5] = positions[n * 3 + 2];
          for (let c = 0; c < 3; c++) {
            starColors[o + c] = LINK_TIP[c] * falloff;
            starColors[o + 3 + c] = colors[n * 3 + c] * falloff * LINK_TAIL;
          }
          used++;
        }
        starPosAttr.needsUpdate = true;
        starColorAttr.needsUpdate = true;
      } else {
        coreGeo.setDrawRange(0, 0);
      }
      starGeo.setDrawRange(0, used * 2);

      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };

    function start() {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    const onContextLost = (e: Event) => {
      e.preventDefault();
      stop();
    };
    canvas.addEventListener('webglcontextlost', onContextLost);

    start();

    return () => {
      stop();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      resizeObserver.disconnect();
      pointGeo.dispose();
      pointMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      coreGeo.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
};

export default HeroMesh;
