import { Post } from "../lib/api";

interface PostLineProps {
  post: Partial<Post>;
}

export default function PostLine({ post }: PostLineProps) {
  const date = new Date((post.date ?? 0) * 1000);

  return (
    <>
      <tr key={post.slug}>
        <td>-rw-r--r--</td>
        <td>{post.author}</td>
        <td>{post.content?.replaceAll(" ", "").length}</td>
        <td>{date.toLocaleString("en-US", { month: "short" })}</td>
        <td>{date.getDate()}</td>
        <td>{date.getFullYear()}</td>
        <td>
          <a className="link" href={post.slug}>
            {post.title}
          </a>
        </td>
      </tr>
    </>
  );
}
