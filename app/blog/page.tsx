import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">文章</h1>
      <ul className="divide-y divide-zinc-300 dark:divide-zinc-700">
        {posts.map((post) => (
          <li key={post.slug} className="space-y-2 py-8 first:pt-0">
              <time className="text-sm text-zinc-400 dark:text-zinc-500">{formatDate(post.date)}</time>
              <Link href={`/blog/${post.slug}`} className="group block">
                <h2 className="text-base font-medium text-zinc-900 underline-offset-4 group-hover:underline dark:text-zinc-100">
                  {post.title}
                </h2>
              </Link>
              <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">{post.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400 dark:hover:bg-indigo-900"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
