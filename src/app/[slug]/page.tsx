import { getAllPosts, getPostBySlug } from "@/app/lib/api";
import { PageProps } from "../../../.next/types/app/[slug]/page";

export const dynamicParams = false;

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const post = await getPostBySlug(slug, {}, [
    "author",
    "content",
    "title",
    "date",
  ]);

  if (!post) {
    return null;
  }

  return (
    <main className="container mx-auto">
      <article className="prose mx-auto">
        <h1>{post.title}</h1>
        <p>
          {post.author} - {new Date((post.date || 0) * 1000).toDateString()}
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: post.content || "",
          }}
        ></div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts({
    select: ["slug"],
  });

  return posts.map((it) => ({
    slug: it.slug,
  }));
}
