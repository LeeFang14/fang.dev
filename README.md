# fang.dev

個人技術部落格，內容涵蓋技術文章、學習心得與職涯分享。

## Tech Stack

| 用途 | 工具 |
| --- | --- |
| Framework | Next.js 16 + React 19 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 4 |
| Content | Markdown + remark/rehype pipeline |
| Code Highlighting | rehype-pretty-code + Shiki |
| Diagrams | Mermaid (client-side rendering) |
| Theme | next-themes (light/dark) |
| Deploy | Vercel |

## Features

- **Blog** — Markdown 文章，支援程式碼高亮與 Mermaid 圖表
- **Tags** — 標籤分類系統，依 tag 篩選文章
- **About** — 個人介紹頁
- **Projects** — 專案作品集，卡片式展示搭配截圖
- **Dark Mode** — 深淺色主題切換

## Project Structure

```
app/
  page.tsx                # 首頁
  blog/
    page.tsx              # 文章列表
    [slug]/page.tsx       # 單篇文章
  tags/
    page.tsx              # Tag 索引
    [tag]/page.tsx        # Tag 文章列表
  about/page.tsx          # About 頁面
  projects/page.tsx       # Projects 頁面
components/               # 共用元件（Header、ThemeProvider）
content/posts/            # Markdown 文章
lib/                      # 資料存取與型別定義
```

## Getting Started

```bash
npm install
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。
