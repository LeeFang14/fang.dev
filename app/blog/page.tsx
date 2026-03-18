const POSTS = [
  {
    slug: "vue-reactivity-deep-dive",
    title: "Vue 3 響應式原理深入解析",
    date: "2025-03-10",
    description:
      "從 Proxy 到 effect，逐步拆解 Vue 3 響應式系統的運作機制，理解為什麼它比 Vue 2 更高效。",
    tags: ["vue", "typescript"],
  },
  {
    slug: "feynman-technique-for-engineers",
    title: "用費曼技巧學技術：我的筆記流程",
    date: "2025-02-22",
    description:
      "把複雜概念講清楚是真正理解的標誌。分享我如何用費曼技巧拆解陌生技術，並記錄思考脈絡。",
    tags: ["learning", "career"],
  },
  {
    slug: "from-manufacturing-to-frontend",
    title: "從傳產流程管理到前端工程師的轉職路",
    date: "2025-01-15",
    description:
      "資管系畢業後在製造業工作，如何把流程拆解的習慣帶進軟體開發，最終成功轉職前端。",
    tags: ["career"],
  },
  {
    slug: "quasar-component-design",
    title: "用 Quasar 設計可複用元件的實戰心得",
    date: "2024-12-05",
    description:
      "在 Quasar 框架下如何設計出好維護、好擴充的 UI 元件，分享實際踩過的坑與最終解法。",
    tags: ["vue", "quasar"],
  },
  {
    slug: "typescript-narrowing",
    title: "TypeScript Type Narrowing 完整指南",
    date: "2024-11-18",
    description:
      "typeof、instanceof、in、discriminated union，搞懂 TypeScript 的型別收窄，寫出更安全的程式碼。",
    tags: ["typescript"],
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        文章
      </h1>
      <ul className="space-y-10">
        {POSTS.map((post) => (
          <li key={post.slug}>
            <a
              href={`/blog/${post.slug}`}
              className="group block space-y-2"
            >
              <time className="text-sm text-zinc-400 dark:text-zinc-500">
                {formatDate(post.date)}
              </time>
              <h2 className="text-base font-medium text-zinc-900 underline-offset-4 group-hover:underline dark:text-zinc-100">
                {post.title}
              </h2>
              <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
