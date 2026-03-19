import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";
import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";
import MermaidRenderer from "./_components/MermaidRenderer";

const POSTS: Record<string, { title: string; date: string; tags: string[]; content: string }> = {
  "vue-reactivity-deep-dive": {
    title: "Vue 3 響應式原理深入解析",
    date: "2025-03-10",
    tags: ["vue", "typescript"],
    content: `
Vue 3 的響應式系統是整個框架的核心，理解它能讓你寫出更高效的程式碼。

## Proxy 取代 Object.defineProperty

Vue 2 使用 \`Object.defineProperty\` 來攔截屬性存取，而 Vue 3 改用 \`Proxy\`：

\`\`\`typescript
function reactive<T extends object>(target: T): T {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return result;
    },
  });
}
\`\`\`

## 架構圖

\`\`\`mermaid
flowchart TD
    A["子元件 emit"] --> B{"欄位數量？"}
    B -->|"1 個欄位"| C["標準 v-model ✅"]
    B -->|"多個固定欄位"| D["多個 v-model ✅"]
    B -->|"多個動態欄位"| E["emit update:field ✅<br/>父元件 formValues[f] = v"]

    F{"父元件狀態類型？"}
    F -->|"需要整個替換（API 載入）"| G["ref ✅"]
    F -->|"只更新單一屬性"| H["ref 或 reactive 都可<br/>建議統一用 ref"]
\`\`\`

## effect 與依賴追蹤

當你存取響應式物件的屬性時，Vue 會記錄哪個 \`effect\` 正在執行：

\`\`\`typescript
let activeEffect: (() => void) | null = null;

function effect(fn: () => void) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}
\`\`\`

## 為什麼比 Vue 2 更高效？

- **陣列支援**：Proxy 可以攔截 \`push\`、\`pop\` 等操作，Vue 2 需要 hack
- **新增屬性**：Proxy 自動攔截，Vue 2 需要 \`Vue.set()\`
- **效能**：不需要在初始化時遍歷所有屬性
    `,
  },
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (
        node.tagName === "pre" &&
        node.children[0]?.type === "element" &&
        (node.children[0] as Element).tagName === "code" &&
        ((node.children[0] as Element).properties?.className as string[])?.includes("language-mermaid")
      ) {
        const codeNode = node.children[0] as Element;
        const textNode = codeNode.children[0];
        const code = textNode?.type === "text" ? textNode.value : "";

        if (parent && index !== undefined) {
          parent.children[index] = {
            type: "element",
            tagName: "div",
            properties: { className: ["mermaid"] },
            children: [{ type: "text", value: code }],
          };
        }
      }
    });
  };
}

const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
};

async function markdownToHtml(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeMermaid)
    .use(rehypePrettyCode, prettyCodeOptions)
    .use(rehypeStringify)
    .process(content);

  return result.toString();
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug];

  if (!post) {
    return <div className="text-zinc-500 dark:text-zinc-400">找不到這篇文章。</div>;
  }

  const html = await markdownToHtml(post.content);

  return (
    <article className="mx-auto max-w-2xl">
      <header className="mb-10 space-y-4">
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
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{post.title}</h1>
        <time className="text-sm text-zinc-400 dark:text-zinc-500">{formatDate(post.date)}</time>
      </header>
      <MermaidRenderer html={html} />
    </article>
  );
}
