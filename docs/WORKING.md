<!-- 本文件：預計放置與 claude 討論的內容，然後請 claude 開發閱讀。持續推進開發並更新。減少每次重啟對話的 prompt -->

# fang.dev 開發計畫

## 相關文件

> Claude 每次對話開始時，除了本文件外，也需要讀取以下文件：

- `docs/GIT.md` — Git 工作流與 commit 規範
- `docs/REFACTORING.md` — 重構原則與放置決策

## 當前進度

**進行中：Phase 1 — 基礎建設**

- [x] 安裝所有套件（next@16.1.6、gray-matter、next-mdx-remote、mermaid、rehype-pretty-code、shiki、next-themes）
- [ ] 建立目錄結構
- [ ] 建立 `lib/posts.ts`（讀取 `.mdx` 工具函式）
- [ ] 寫一篇測試用假文章（含 frontmatter、程式碼區塊、Mermaid）

---

## 專案定位

個人品牌部落格，內容涵蓋技術文章、學習心得、職涯分享，以及 About、Projects 頁面。

---

## 技術選型

| 用途             | 工具                                |
| ---------------- | ----------------------------------- |
| 框架             | Next.js 16 + React 19（App Router） |
| 語言             | TypeScript（strict mode）           |
| 樣式             | Tailwind CSS 4                      |
| Frontmatter 解析 | `gray-matter`                       |
| MDX 渲染         | `next-mdx-remote`                   |
| Mermaid 圖表     | `mermaid`（client-side 渲染）       |
| 程式碼高亮       | `rehype-pretty-code` + `shiki`      |
| 程式碼主題       | `github-dark` + `github-light`      |
| 深淺色切換       | `next-themes`                       |
| 部署             | Vercel                              |

---

## 內容架構

### 分類（Category）

- `技術` — Vue、TypeScript、重構、API 設計等
- `學習` — 學習方法、知識管理、AI 協作等
- `職涯` — 面試、個人成長等

### 標籤原則

- 控制在 10–15 個內，統一用英文或中文，不混用
- 避免 Obsidian 筆記庫的標籤爆炸問題

### 頁面清單

- `/` — 首頁
- `/blog` — 文章列表
- `/blog/[category]/[slug]` — 單篇文章
- `/about` — 關於我
- `/projects` — 專案介紹

---

## 內容格式

所有文章使用 **`.mdx`** 格式（Markdown + JSX），支援嵌入 React 元件（Mermaid、自訂 callout 等），向下相容純 Markdown 語法。

### Frontmatter 格式

每篇文章頂部必須包含以下 frontmatter：

```yaml
---
title: 文章標題
date: 2024-01-01
category: 技術 # 對應 content/posts/ 下的資料夾名稱
tags:
  - Vue
  - TypeScript
description: 文章摘要，用於列表頁和 SEO meta description
published: true # false 表示草稿，build 時不會輸出
---
```

### 草稿管理

- 草稿放在 `content/drafts/`
- `content/drafts/` 加入 `.gitignore`，不推上遠端
- 或在 frontmatter 設定 `published: false`，推上遠端但 build 時不輸出

---

## 目錄結構

```
content/
  posts/
    技術/
      vue-reactivity.mdx
    學習/
      note-system.mdx
  drafts/                       # 草稿（.gitignore，不推遠端）
    wip-post.mdx

app/
  blog/
    page.tsx                    # 文章列表
    [category]/
      [slug]/
        page.tsx                # 單篇文章
  about/
    page.tsx
  projects/
    page.tsx

lib/
  posts.ts                      # 讀取、解析 .mdx 的工具函式
  types/
    post.ts

components/
  Mermaid.tsx                   # Mermaid client component
  MDXComponents.tsx             # 自訂 MDX 元件對應表
```

---

## Git 分支策略

**GitHub Flow**（簡化版，不使用 Gitflow）

- `main` — 永遠是可部署狀態，對應 Vercel production
- `feature/*` — 每個功能開獨立分支，完成後 merge 回 main
- feature branch push 後 Vercel 自動產生 Preview URL

---

## 開發順序

### Phase 1：基礎建設

- [ ] 安裝所有套件
- [ ] 建立目錄結構
- [ ] 建立 `lib/posts.ts`（讀取 `.mdx` 工具函式）
- [ ] 寫一篇測試用假文章（含 frontmatter、程式碼區塊、Mermaid）

### Phase 2：UI（hardcode 假資料）

- [ ] 全局 layout（Header、Footer、深淺色切換）
- [ ] 首頁
- [ ] 文章列表頁 `/blog`
- [ ] 單篇文章頁（MDX 渲染、程式碼高亮、Mermaid）

### Phase 3：接上真實資料

- [ ] 接上 `lib/posts.ts`，讀取真實 `.mdx` 檔案
- [ ] 分類篩選
- [ ] Tag 篩選

### Phase 4：靜態頁面

- [ ] About 頁面
- [ ] Projects 頁面

### Phase 5：優化

- [ ] SEO（metadata、OG image）
- [ ] RSS Feed（選做）
- [ ] 效能檢查

---

## 暫緩功能（之後再加）

- 搜尋功能
- 留言系統
- RSS Feed
