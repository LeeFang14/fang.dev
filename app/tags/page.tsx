import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function TagsPage() {
  const posts = getAllPosts();

  const tagCounts = posts.reduce<Record<string, number>>((acc, post) => {
    for (const tag of post.tags) {
      acc[tag] = (acc[tag] ?? 0) + 1;
    }
    return acc;
  }, {});

  const tags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Tags</h1>
      <ul className="flex flex-wrap gap-3">
        {tags.map(([tag, count]) => (
          <li key={tag}>
            <Link
              href={`/tags/${tag}`}
              className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 ring-1 ring-zinc-100 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 hover:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700/50 dark:hover:border-indigo-700 dark:hover:bg-indigo-950 dark:hover:text-indigo-400 dark:hover:ring-indigo-400/10"
            >
              {tag}
              <span className="text-xs text-zinc-400 dark:text-zinc-500">{count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
