import { remark } from "remark";
import remarkHtml from "remark-html";

import { getAllPosts, getPostBySlug } from "@/app/lib/api";
import ScrollPercentage from "./ScrollPercentage";
import Client from "./client";

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number];
}) {
  const { slug } = params;
  const post = await getPostBySlug(slug!, {}, [
    "author",
    "content",
    "title",
    "date",
    "description",
  ]);

  const content = await getPostContent(post?.content ?? "");

  if (!post) {
    return null;
  }

  return (
    <main>
      {<Client />}
      <article className="mx-auto space-y-3">
        <div className="flex gap-5 justify-between">
          <div className="flex-grow basis-0 hidden md:block">
            {new Date(post.date!).toDateString()}
          </div>
          <h1 className="text-center">{slug}</h1>
          <div className="flex-grow basis-0 text-right hidden md:block">
            {post.author}
          </div>
        </div>
        <div>
          <p className="uppercase font-semibold">title</p>
          <p className="pl-20">{post.title}</p>
        </div>
        <div>
          <p className="uppercase font-semibold">description</p>
          <p className="pl-20">{post.description}</p>
        </div>
        <div>
          <p className="uppercase font-semibold">content</p>
          <div
            className="pl-20 prose prose-code:text-white prose-code:bg-gray-600 prose-a:text-white prose-blockquote:text-white text-white prose-headings:text-white max-w-full"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></div>
        </div>
        <p className="text-center">From Kyle with ♡</p>
      </article>
      <p className="fixed left-0 bottom-0 bg-white text-black px-3 w-fit">
        Manual page (<ScrollPercentage />) (press q or backspace or click{" "}
        <a className="underline" href="/">
          here
        </a>{" "}
        to quit)
      </p>
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

async function getPostContent(rawStr: string) {
  const file = await remark().use(remarkHtml).process(rawStr);
  return String(file);
}
