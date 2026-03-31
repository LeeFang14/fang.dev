import Image from "next/image";

const PROJECTS = [
  {
    title: "南翔防水內部管理系統",
    period: "2025/12 — 2026/01",
    context: "Side Project",
    description: "為防水工程公司獨立開發的內部業務管理系統，以 LINE LIFF 為入口，串聯報價、專案、財務收支的完整流程。",
    techStack: ["Vue 3", "TypeScript", "Pinia", "Quasar", "Sass", "LINE LIFF", "Google Apps Script"],
    images: [
      "/images/projects/nx-1.png",
      "/images/projects/nx-2.png",
      "/images/projects/nx-3.png",
      "/images/projects/nx-4.png",
    ],
    imageOrientation: "portrait",
  },
  {
    title: "亞廚客製化蛋糕網站｜蛋糕編輯器",
    period: "2024/07 — 2024/08",
    context: "好想工作室協作案",
    description: "線上客製化蛋糕的互動式編輯器，負責 RWD 切版與 Konva.js 畫布互動邏輯實作。",
    techStack: ["Vue 3", "Pinia", "Quasar", "Tailwind", "Konva.js", "Axios"],
    link: "https://cake.pre-stage.cc/cake-basic-info?openExternalBrowser=1",
    images: [
      "/images/projects/cake-1.png",
      "/images/projects/cake-2.png",
      "/images/projects/cake-3.png",
      "/images/projects/cake-4.png",
    ],
    imageOrientation: "landscape",
  },
  {
    title: "成功大學 SDG Index｜形象網站",
    period: "2022/11 — 2022/12",
    context: "好想工作室協作案",
    description: "Web Camp 培訓期間與學員及前輩共同完成的形象網站，負責 RWD 切版分工。",
    techStack: ["Vue 3", "Sass", "Bootstrap", "Git Flow"],
    images: ["/images/projects/SDG-1.png", "/images/projects/SDG-2.png"],
    imageOrientation: "landscape",
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="border-l-3 border-indigo-500 pl-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">作品集</h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">我參與過的專案與作品</p>
      </div>

      <ul className="space-y-12">
        {PROJECTS.map((project) => (
          <li key={project.title} className="space-y-4 border-l-2 border-zinc-200 pl-5 dark:border-zinc-800">
            {/* Header */}
            <div className="space-y-1">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h2>
              <div className="flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500">
                <span>{project.period}</span>
                <span>·</span>
                <span>{project.context}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{project.description}</p>

            {/* Images */}
            {project.images.length > 0 && (
              <div className={`grid gap-2 ${project.imageOrientation === "portrait" ? "grid-cols-4" : "grid-cols-2"}`}>
                {project.images.map((src) => (
                  <div key={src} className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <Image src={src} alt={project.title} width={600} height={400} className="h-auto w-full" />
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Link */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
              >
                查看連結 ↗
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
