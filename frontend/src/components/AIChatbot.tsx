import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { COLD_START_HINT_MS, TimeoutError, postJSON } from '@/lib/api';

type Message = { type: 'bot' | 'user'; text: string };

const GREETING: Message = {
  type: 'bot',
  text: "Hi! Looking for something in Shubham's portfolio? I can help.",
};

const SUGGESTIONS = [
  'What does he build with MCP?',
  'Show me his AI projects',
  'What is his tech stack?',
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [slowHint, setSlowHint] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the newest message in view.
  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, loading, slowHint]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Escape closes the panel. It is a popover, not a modal, so focus is not
  // trapped — the rest of the page stays usable while it is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const send = async (question: string) => {
    const text = question.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { type: 'user', text }]);
    setInputMessage('');
    setLoading(true);
    setSlowHint(false);

    const hintTimer = window.setTimeout(() => setSlowHint(true), COLD_START_HINT_MS);

    try {
      const { response, data } = await postJSON<{ answer?: string }>('/rag', { question: text });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: data?.answer || "Sorry, I couldn't get a response." },
      ]);
    } catch (error) {
      const text =
        error instanceof TimeoutError
          ? 'That took too long to come back. The server may be asleep — try again in a moment.'
          : "Sorry, I couldn't reach the server.";
      setMessages((prev) => [...prev, { type: 'bot', text }]);
    } finally {
      window.clearTimeout(hintTimer);
      setSlowHint(false);
      setLoading(false);
    }
  };

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <>
      {/* Launcher */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open AI assistant"
          className="group fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-400 hover:to-violet-400"
          style={{ boxShadow: '0 8px 30px rgba(79,140,255,0.35)' }}
        >
          <MessageCircle size={22} />
          <span className="absolute inset-0 rounded-full ring-1 ring-white/20" />
        </button>
      )}

      {/* Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI assistant"
          className="fixed z-50 inset-x-4 bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[380px] h-[min(560px,calc(100vh-2rem))] flex flex-col bg-[#0b0f1c] border border-white/10 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
          style={{ boxShadow: '0 24px 70px -20px rgba(0,0,0,0.8), 0 0 40px rgba(79,140,255,0.08)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-b border-white/[0.07] bg-white/[0.02]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center flex-none">
                <Sparkles size={17} className="text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-white font-semibold text-[14px] leading-tight">AI Assistant</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  <span className="text-slate-400 text-[11px]">Ask about the portfolio</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close AI assistant"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.07] transition-colors flex-none"
            >
              <X size={17} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-violet-500 text-white rounded-2xl rounded-br-md'
                      : 'bg-white/[0.055] border border-white/10 text-slate-200 rounded-2xl rounded-bl-md'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/[0.055] border border-white/10 rounded-2xl rounded-bl-md px-3.5 py-3">
                  <span className="flex items-center gap-1" aria-label="Thinking">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-slate-400 motion-safe:animate-bounce"
                        style={{ animationDelay: `${i * 140}ms` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}

            {slowHint && (
              <p className="text-slate-500 text-[11.5px] text-center px-4">
                Still working — the server sleeps when idle, so the first answer can take a while.
              </p>
            )}

            {showSuggestions && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => send(suggestion)}
                    className="px-3 py-1.5 rounded-full text-[12px] text-slate-300 bg-white/[0.04] border border-white/10 hover:border-blue-400/40 hover:text-white transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="p-3 border-t border-white/[0.07] bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send(inputMessage);
                  }
                }}
                placeholder="Ask about projects, skills..."
                aria-label="Message"
                className="flex-1 min-w-0 px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-slate-500 text-[13.5px] focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/15 transition-all duration-200 disabled:opacity-60"
                disabled={loading}
              />
              <button
                onClick={() => send(inputMessage)}
                aria-label="Send message"
                disabled={loading || !inputMessage.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 text-white flex items-center justify-center flex-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
