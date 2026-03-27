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
| MD 渲染          | `remark` + `rehype` pipeline        |
| Mermaid 圖表     | `mermaid`（client-side 渲染）       |
| 程式碼高亮       | `rehype-pretty-code` + `shiki`      |
| 程式碼主題       | `github-dark` + `github-light`      |
| 深淺色切換       | `next-themes`                       |
| 部署             | Vercel                              |

---

## 決策摘要

- **深色模式用 class-based**：`next-themes` 需要 class 控制，移除原本的 `prefers-color-scheme` media query
- **設計風格**：極簡技術感，Geist Sans/Mono，強調色 indigo，支援深淺色
- **路由結構**：`/blog/[slug]`，不分類資料夾層；分類改用 tag 系統
- **分類設計**：不用資料夾分類，改用 frontmatter 的 `tags` 陣列；Navbar 有 Tags 頁供讀者篩選
- **文章排序**：日期由新到舊，Google 搜尋是主要入口，URL 要乾淨
- **設計改版方向**：線條結構 + 玻璃效果點綴，配色 Indigo + Slate 低調版，內容為主不搶眼

---

## 當前 Phase

### Phase 5 — 設計改版（Indigo + Slate 低調玻璃風）

**背景漸層**
- [x] `globals.css` 加入微妙的背景漸層色塊（indigo + slate），讓玻璃效果有東西可透

**線條結構**
- [ ] 文章列表（首頁、`/blog`、`/tags/[tag]`）項目之間加分隔線
- [ ] Projects 卡片加 border
- [ ] 頁面 section 之間加 divider

**玻璃效果**
- [ ] Header 毛玻璃效果加強
- [ ] Projects 卡片加玻璃質感（半透明背景 + backdrop-blur + 微妙 border）
- [ ] Tag badge 加玻璃質感

**裝飾細節**
- [ ] 頁面標題加左側邊線裝飾（border-left，indigo 色）

---

## 已完成 Phase

### Phase 4 — About 頁面、Projects 頁面

- [x] 建立 `app/about/page.tsx` — Initials 頭像、自我介紹文字、GitHub 連結
- [x] 驗證 lint 通過
- [x] 建立 `app/projects/page.tsx` — 專案卡片列表（hardcode 資料）
- [x] 驗證 lint 通過

### Phase 3 — Tags 功能

- [x] Navbar 加入 Tags 入口，連到 `/tags`
- [x] `/tags` — tag 索引頁，列出所有曾使用過的 tag 名稱（點擊後跳到該 tag 的文章列表）
- [x] `lib/posts.ts` 加入 `getPostsByTag`：過濾指定 tag 的文章
- [x] `/tags/[tag]` — tag 文章列表頁，列出所有標記該 tag 的文章
- [x] blog 頁的 tag badge 改成可點擊連結，連到 `/tags/[tag]`

### Phase 2 — UI（hardcode 假資料）

- [x] 全局 layout：Header（sticky + 毛玻璃）、導覽（Blog/About/Projects）、深淺色切換
- [x] 首頁：Hero 自我介紹 + 最新文章 3 篇
- [x] 文章列表頁 `/blog`：日期 + 標題 + 摘要 + tag 列表
- [x] 單篇文章頁：metadata + MD 渲染（prose）+ 程式碼高亮 + Mermaid

---

## 後續 Phase

- **Phase 5**：SEO（metadata、OG image）、效能檢查
- **待辦（細節優化）**：程式碼區塊加入行號（`showLineNumbers`）與複製按鈕（`MermaidRenderer` useEffect 動態插入）

---

## 內容格式參考

### Frontmatter 格式

```yaml
---
title: 文章標題
date: 2024-01-01
tags:
  - vue
  - typescript
description: 文章摘要，用於列表頁和 SEO meta description
published: true
---
```

### 目錄結構

```
content/
  posts/
    vue-reactivity.md          # 扁平放，不分資料夾
    feynman-technique.md
  drafts/                       # 草稿（.gitignore，不推遠端）

app/
  blog/
    page.tsx
    [slug]/
      page.tsx
  tags/
    page.tsx
    [tag]/
      page.tsx
  about/
    page.tsx
  projects/
    page.tsx
```
