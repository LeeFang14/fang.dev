import Link from "next/link";

const KEYWORDS = ["Vue 3", "TypeScript", "扣件製造業", "LINE LIFF", "AI 協作"];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      {/* Header with avatar */}
      <div className="flex items-center gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
          F
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Fang Lee</h1>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">前端開發者</p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
        <p>這裡是我記錄技術、學習和思考的地方。</p>

        <p>
          轉職前端之前，我在傳產製造業（扣件）待了近九年，歷任倉管、生管、品管。那段時間讓我習慣在複雜的作業流程中找出問題核心——什麼環節卡住、什麼資訊沒有對齊、什麼地方可以更省力。這些經驗讓我在寫程式時，不只是把畫面做出來，而是會先想清楚流程怎麼跑、資料怎麼流。
        </p>

        <p>
          在 AI
          工具快速普及的時代，產出的速度越來越快，但我覺得「為什麼這樣做」的思考反而更重要。工具可以幫你寫出程式碼，但判斷該不該做、怎麼拆解問題，還是得靠自己想清楚。這也是我寫這個部落格的原因——不只記錄怎麼做，也記錄為什麼這樣想。
        </p>

        <p>
          現在的我專注在 Vue.js
          生態系的前端開發。因為有製造業的現場經驗，比起只把畫面做出來，我更在意系統能不能真正解決現場的問題——從理解需求到落地使用，這是我想持續深入的方向。
        </p>

        <p>
          如果你對我的作品有興趣，可以到{" "}
          <Link
            href="/projects"
            className="font-medium text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
          >
            Projects
          </Link>{" "}
          看看。
        </p>
      </div>

      {/* Footer: GitHub + Keywords */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 pt-6 dark:border-zinc-800">
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
        <div className="flex flex-wrap gap-2">
          {KEYWORDS.map((keyword) => (
            <span
              key={keyword}
              className="rounded-md bg-zinc-100 px-2.5 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
