import { getPostsByTag, getAllPosts } from "@/lib/posts";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).map((tag) => ({ tag }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {decodedTag}
        </h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          共 {posts.length} 篇文章
        </p>
      </div>
      <ul className="divide-y divide-zinc-300 dark:divide-zinc-700">
        {posts.map((post) => (
          <li key={post.slug} className="py-8 first:pt-0">
            <a href={`/blog/${post.slug}`} className="group block space-y-2">
              <time className="text-sm text-zinc-400 dark:text-zinc-500">{formatDate(post.date)}</time>
              <h2 className="text-base font-medium text-zinc-900 underline-offset-4 group-hover:underline dark:text-zinc-100">
                {post.title}
              </h2>
              <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">{post.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                  >
                    {t}
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
