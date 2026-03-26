# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# 開發伺服器
npm run dev

# 構建
npm run build

# 生產伺服器
npm run start

# Lint
npm run lint
```

## Architecture

這是一個以 **Next.js App Router** 為基礎的個人網站（fang.dev），使用 React 19 + TypeScript + Tailwind CSS 4。

### 技術棧

- **Next.js 16** with App Router（非 Pages Router）
- **Tailwind CSS 4**：透過 `@tailwindcss/postcss` 整合，全局樣式在 `app/globals.css` 用 `@import "tailwindcss"` 引入
- **TypeScript**：strict mode 啟用，路徑別名 `@/*` 對應根目錄
- **ESLint 9**：flat config 格式（`eslint.config.mjs`）

### 目錄結構

```
app/                    # Next.js App Router 根目錄
  layout.tsx            # 根 layout，載入 Geist 字體與 metadata
  page.tsx              # 首頁
  globals.css           # 全局 CSS（CSS 變數、Tailwind 引入）
  blog/
    page.tsx            # 文章列表頁
    [slug]/
      page.tsx          # 單篇文章頁
      _components/      # 文章頁專用元件（MermaidRenderer）
  tags/
    page.tsx            # Tag 索引頁
    [tag]/
      page.tsx          # Tag 文章列表頁
  about/
    page.tsx            # About 頁面
  projects/
    page.tsx            # Projects 頁面
components/             # 跨頁面共用元件（Header、ThemeProvider）
content/
  posts/                # MD 文章（扁平放置）
  drafts/               # 草稿（.gitignore）
lib/
  posts.ts              # 文章資料存取邏輯
  types/                # 共用型別定義
public/                 # 靜態資源（SVG、圖片）
next.config.ts          # Next.js 設定
```

### 慣例

- CSS 變數定義在 `globals.css`（`--background`、`--foreground`）
- 深色模式透過 `next-themes` 的 class-based 切換（`.dark` class）
- 響應式設計使用 Tailwind 的 `sm:` 斷點

## 協作規則

### 對話開始時

每次開啟新對話，必須先讀取以下文件再開始任何工作：

1. `docs/WORKING.md` — 當前進度、待辦、決策脈絡
2. `docs/WORKING.md` 中「相關文件」區塊列出的所有文件

### 實作前

開始實作前，必須確認 `docs/WORKING.md` 的當前 Phase 有對應的 checkbox 清單。若沒有，先補上再動手。

### 實作節奏

每完成 `docs/WORKING.md` 中的一個 checkbox：

1. 將該項目標記為 `[x]`
2. 暫停，提示使用者確認是否 commit
3. 等待使用者確認後，才繼續下一個 checkbox

### WORKING.md 的邊界

- **不得自行修改後續 Phase 的內容**：後續 Phase 只有使用者討論確認後才能展開或調整
- **不得自行新增 Phase**：Phase 的規劃由使用者決定
- **決策摘要由使用者維護**：Claude 可以提醒使用者補充，但不主動新增

### 討論轉實作時

當討論從「要不要做」轉到「怎麼做」，主動詢問是否需要先更新 `docs/WORKING.md`。

## Git Workflow

完整規則見 `docs/GIT.md`，核心摘要：

**Claude 不自動 commit**，只負責：
1. Stage 完成的變更
2. 建議 commit message（Conventional Commits 格式）
3. 提醒使用者執行 commit

**commit 前必跑：**
```bash
npm run type-check # 確認 type 正常
npm run lint    # 修正 lint 問題
```

**Commit 類型：** `feat` / `fix` / `style` / `refactor` / `chore`

## Refactoring

完整規則見 `docs/REFACTORING.md`，核心原則：

1. **不確定就先放模組內** — 不要過早提升到全域
2. **第三次重複才抽象** — 兩次重複仍可接受，第三次才建立共用
3. **小步重構，多次 commit** — 每個獨立步驟都是一個 commit

**放置決策：**

```
Type 定義
├─ API 資料結構        → app/lib/types/ 或 api 層
├─ 單一頁面/元件使用  → 元件內部定義
└─ 模組內多處使用     → {feature}/types.ts

元件
├─ 單一頁面使用        → app/{feature}/_components/
└─ 跨頁面共用          → components/

Hooks
├─ 通用工具            → hooks/
└─ 業務邏輯            → app/{feature}/_hooks/
```
