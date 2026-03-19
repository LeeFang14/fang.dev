# Git Workflow

Git workflow guidelines and commit message conventions for this project.

## 分支策略

**GitHub Flow**（簡化版，不使用 Gitflow）

- `main` — 永遠是可部署狀態，對應 Vercel production
- `feature/*` — 每個功能開獨立分支，完成後 merge 回 main
- feature branch push 後 Vercel 自動產生 Preview URL

## Claude's Role in Git Operations

**DO NOT auto-commit:**

- Claude should **NEVER** execute `git commit` automatically
- User prefers to review changes and commit manually
- This gives user full control over commit timing and message finalization

**Claude's responsibilities:**

1. **Stage files** - Use `git add` to stage completed changes
2. **Suggest commit message** - Provide a commit message following the user's style (see Commit Message Format below)
3. **Remind to commit** - Prompt user when changes are ready to commit

**Example workflow:**

```
[After completing implementation]
Claude: "✅ Changes completed. Files are staged and ready to commit.

Suggested commit message:
---
feat(api): add development mode for API testing without LIFF

Enable testing quotation APIs in external browsers without requiring
valid LINE LIFF tokens.

Changes:
- apps-script/Auth.gs: Skip auth when DEV_MODE=true
- src/api/quotation.ts: Use DEV_TOKEN when no real token
- apps-script/README.md: Document DEV_MODE property

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
---

You can commit now with: git commit -m '...' or modify as needed."
```

**Before committing:**

```bash
npm run type-check  # Ensure no TS errors
npm run build       # Ensure production build works
npm run lint        # Fix any linting issues
```

**Unstaged files to be aware of:**

- `.env` (ignored, contains secrets)
- `dist/` (build output, ignored)
- `node_modules/` (dependencies, ignored)

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification:

**Commit Types:**

1. **`feat`** - 新增/修改功能 (feature)
   - Adding new features or modifying existing ones
   - Example: `feat: add dark mode toggle to settings`

2. **`fix`** - 修補 bug (bug fix)
   - Fixing bugs or errors
   - Example: `fix: resolve login redirect loop`

3. **`style`** - 格式調整 (formatting changes)
   - Changes that don't affect code execution (whitespace, formatting, missing semicolons)
   - Example: `style: format code with prettier`

4. **`refactor`** - 重構 (code refactoring)
   - Code restructuring without adding features or fixing bugs
   - Improving code structure, readability, or maintainability
   - Example: `refactor: extract helper functions for better reusability`

5. **`chore`** - 雜項更新 (maintenance tasks)
   - Changes that don't affect program behavior
   - Updating dependencies, build tools, or configuration files
   - Example: `chore: update browserslist and refresh caniuse-lite`

**Decision Guide:**

- **Environment/tooling changes (no behavior change)** → `chore`
  - Examples: Browserslist, Webpack, ESLint config, package.json dependencies
  - ✅ `chore: update browserslist and refresh caniuse-lite`

- **Code structure changes (behavior unchanged)** → `refactor`
  - Examples: Extract functions, reorganize components, improve readability
  - ✅ `refactor: extract validation logic into separate module`
