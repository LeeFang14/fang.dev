const TECH_STACK = ["Vue 3", "TypeScript", "Quasar"];

const LATEST_POSTS = [
  {
    slug: "vue-reactivity-deep-dive",
    title: "Vue 3 響應式原理深入解析",
    date: "2025-03-10",
    description: "從 Proxy 到 effect，逐步拆解 Vue 3 響應式系統的運作機制，理解為什麼它比 Vue 2 更高效。",
    tags: ["vue", "typescript"],
  },
  {
    slug: "feynman-technique-for-engineers",
    title: "用費曼技巧學技術：我的筆記流程",
    date: "2025-02-22",
    description: "把複雜概念講清楚是真正理解的標誌。分享我如何用費曼技巧拆解陌生技術，並記錄思考脈絡。",
    tags: ["learning", "career"],
  },
  {
    slug: "from-manufacturing-to-frontend",
    title: "從傳產流程管理到前端工程師的轉職路",
    date: "2025-01-15",
    description: "資管系畢業後在製造業工作，如何把流程拆解的習慣帶進軟體開發，最終成功轉職前端。",
    tags: ["career"],
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

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Hi, I&apos;m Fang</h1>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">技術 · 學習 · 思考</p>
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-zinc-100 px-2.5 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* GitHub link */}
        <a
          href="https://github.com/LeeFang14"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          GitHub
        </a>
      </section>

      {/* Latest Posts */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">最新文章</h2>
        <ul className="space-y-8">
          {LATEST_POSTS.map((post) => (
            <li key={post.slug}>
              <a href={`/blog/${post.slug}`} className="group block space-y-2">
                <div className="flex items-center gap-3">
                  <time className="text-sm text-zinc-400 dark:text-zinc-500">{formatDate(post.date)}</time>
                </div>
                <h3 className="text-base font-medium text-zinc-900 underline-offset-4 group-hover:underline dark:text-zinc-100">
                  {post.title}
                </h3>
                <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">{post.description}</p>
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

        <a
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
        >
          查看所有文章 →
        </a>
      </section>
    </div>
  );
}
