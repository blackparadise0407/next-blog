import { Metadata } from "next";
import { remark } from "remark";
import remarkHtml from "remark-html";

import { getAllPosts, getPostBySlug } from "@/app/lib/api";
import ScrollPercentage from "./ScrollPercentage";
import Client from "./client";

type StaticParams = Awaited<ReturnType<typeof generateStaticParams>>[number];

type Props = {
  params: StaticParams;
};

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const post = await getPostBySlug(slug!, {}, [
    "author",
    "title",
    "date",
    "description",
  ]);

  if (!post) {
    return {};
  }

  const url = `https://elykp.com/${slug}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      type: "article",
      locale: "en",
      authors: post.author,
      url: url,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function Page({ params }: { params: StaticParams }) {
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
      <article className="mx-auto space-y-3 pb-6">
        <div className="flex gap-5 justify-between">
          <div className="flex-grow basis-0 hidden md:block">
            {new Date(post.date!).toDateString()}
          </div>
          <h1 className="text-center flex-grow md:flex-grow-0">{slug}</h1>
          <div className="flex-grow basis-0 text-right hidden md:block">
            {post.author}
          </div>
        </div>
        <div>
          <p className="uppercase font-semibold">title</p>
          <p className="pl-10 md:pl-20">{post.title}</p>
        </div>
        <div>
          <p className="uppercase font-semibold">description</p>
          <p className="pl-10 md:pl-20">{post.description}</p>
        </div>
        <div>
          <p className="uppercase font-semibold">content</p>
          <div
            className="pl-10 md:pl-20 prose prose-blue prose-invert max-w-full"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></div>
        </div>
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
