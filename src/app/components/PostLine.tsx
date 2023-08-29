import React from "react";

import { Post } from "../lib/api";

interface PostLineProps {
  post: Partial<Post>;
}

export default function PostLine({ post }: PostLineProps) {
  const date = new Date(post.date!);

  return (
    <div className="break-all space-x-3">
      <span className="inline-block w-20">-rw-r--r--</span>
      <span className="inline-block w-60">{post.author}</span>
      <span className="inline-block w-10">
        {post.content?.replaceAll(" ", "").length}
      </span>
      <span className="inline-block w-8">
        {date.toLocaleString("en-US", { month: "short" })}
      </span>
      <span className="inline-block w-6">{date.getDate()}</span>
      <span className="inline-block w-10">{date.getFullYear()}</span>
      <span>
        <a className="link" href={post.slug}>
          {post.title}
        </a>{" "}
        {post.pinned && "📌"}
      </span>
    </div>
  );
}
