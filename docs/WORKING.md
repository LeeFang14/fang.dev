<!--
AI 使用指南：
1. 先看「當前 Phase」— 這是現在要做的事
2. 看「決策摘要」— 了解之前做過什麼決定
3. 北極星和技術選型是背景，不需要每次都細讀
4. 後續 Phase 不要提前展開，等使用者討論後才展開
-->

# fang.dev 開發計畫

## 相關文件

> Claude 每次對話開始時，除了本文件外，也需要讀取以下文件：

- `docs/GIT.md` — Git 工作流與 commit 規範
- `docs/REFACTORING.md` — 重構原則與放置決策

---

## 北極星

個人品牌部落格，內容涵蓋技術文章、學習心得、職涯分享。核心頁面：首頁、文章列表、單篇文章、About、Projects。讀者是對技術有興趣的工程師，風格走極簡技術感。
部落格參考：[https://tailwind-nextjs-starter-blog.vercel.app/](https://tailwind-nextjs-starter-blog.vercel.app/)

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

## 決策摘要

- **深色模式用 class-based**：`next-themes` 需要 class 控制，移除原本的 `prefers-color-scheme` media query
- **設計風格**：極簡技術感，Geist Sans/Mono，強調色 indigo，支援深淺色
- **路由結構**：`/blog/[category]/[slug]`，category 對應 `content/posts/` 下的資料夾名稱

---

## 當前 Phase：Phase 2 — UI（hardcode 假資料）

- [x] 全局 layout：Header（sticky + 毛玻璃）、導覽（Blog/About/Projects）、深淺色切換
- [ ] 首頁：Hero 自我介紹 + 最新文章 3 篇
- [ ] 文章列表頁 `/blog`：日期 + 標題 + 摘要 + 標籤清單
- [ ] 單篇文章頁：metadata + MDX 渲染（prose）+ 程式碼高亮 + Mermaid

---

## 後續 Phase

- **Phase 3**：接上 `lib/posts.ts`，讀取真實 `.mdx` 檔案，加入分類與 Tag 篩選
- **Phase 4**：About 頁面、Projects 頁面
- **Phase 5**：SEO（metadata、OG image）、效能檢查

---

## 內容格式參考

### Frontmatter 格式

```yaml
---
title: 文章標題
date: 2024-01-01
category: 技術
tags:
  - Vue
  - TypeScript
description: 文章摘要，用於列表頁和 SEO meta description
published: true
---
```

### 目錄結構

```
content/
  posts/
    技術/
    學習/
  drafts/                       # 草稿（.gitignore，不推遠端）

app/
  blog/
    page.tsx
    [category]/
      [slug]/
        page.tsx
  about/
    page.tsx
  projects/
    page.tsx
