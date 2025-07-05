# 🧠 Git & GitHub Commands Cheat Sheet

> A quick reference guide to essential Git and GitHub CLI (`gh`) commands, with clear explanations to help you manage your projects effectively.

---

## 🔐 Authentication

### `gh auth login`

Log in to GitHub using the terminal. Supports browser-based login or token-based authentication.

### `gh auth logout`

Logs you out of GitHub CLI on the current machine.

---

## 📦 Repository Initialization & Setup

### `git init`

Initialize a new Git repository in the current directory.

### `git remote add origin <repo-url>`

Link your local repository to a remote repository hosted on GitHub.

### `git remote -v`

View the current configured remote URLs for fetch and push.

### `git remote set-url origin <new-url>`

Change the remote repository URL (e.g., switch from HTTPS to SSH).

### `rm -rf .git`

Remove Git tracking from the current directory to start fresh.

---

## 📝 Adding & Committing Changes

### `git add .`

Stage all changes (new, modified, and deleted files) for the next commit.

### `git commit -m "Your message"`

Commit staged changes with a descriptive message.

### `git status`

Show the status of changes: staged, unstaged, and untracked files.

### `git log`

View the commit history in the current branch.

---

## 🚀 Pushing & Pulling Code

### `git push -u origin main`

Push local commits to the remote `main` branch and set upstream tracking.

### `git pull origin main`

Fetch and merge the latest changes from the remote `main` branch.

---

## 🌿 Branching

### `git branch`

List all local branches in the repository.

### `git checkout -b new-branch`

Create and switch to a new branch.

### `git checkout main`

Switch back to the `main` branch.

### `git merge <branch-name>`

Merge a specified branch into the current branch.

---

## ♻️ Undoing & Resetting

### `git reset --soft HEAD~1`

Undo the last commit but keep the changes staged.

### `git reset --hard HEAD~1`

Completely remove the last commit and discard all changes.

### `git rm --cached <file>`

Untrack a file from Git without deleting it from your filesystem. Useful for removing accidentally committed files or submodules.

---

## 📁 Ignoring Files

### `.gitignore`

Defines which files and directories Git should ignore in the repository.

**Example:**

```
node_modules/
dist/
.env
```

---

Need advanced commands like rebasing, stashing, or resolving conflicts? Let me know, and I’ll expand this guide!
