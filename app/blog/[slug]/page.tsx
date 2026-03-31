import Link from "next/link";
import { notFound } from "next/navigation";
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
import { getPostBySlug } from "@/lib/posts";

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
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const html = await markdownToHtml(post.content);

  return (
    <article className="mx-auto max-w-2xl">
      <header className="mb-10 space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="rounded border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600 ring-1 ring-indigo-100 transition-colors hover:bg-indigo-100 dark:border-indigo-400/30 dark:bg-indigo-950 dark:text-indigo-400 dark:ring-indigo-400/10 dark:hover:bg-indigo-900"
            >
              {tag}
            </Link>
          ))}
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{post.title}</h1>
        <time className="text-sm text-zinc-400 dark:text-zinc-500">{formatDate(post.date)}</time>
      </header>
      <MermaidRenderer html={html} />
    </article>
  );
}
