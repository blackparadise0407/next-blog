import fsPromise from "fs/promises";
import matter from "gray-matter";
import path from "path";

export interface Post {
  author: string;
  title: string;
  date: number;
  slug: string;
  content: string;
  archive: boolean;
  description: string;
  pinned: boolean;
}

interface PostFilters extends Partial<Post> {}

interface IGetAllPostsQuery {
  filters?: PostFilters;
  select?: Array<keyof Post>;
}

interface IGetAllPosts {
  (q: IGetAllPostsQuery): Promise<Partial<Post>[]>;
}

const postsDir = path.join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fsPromise.readdir(postsDir);
}

export const getPostBySlug = async (
  slug: string,
  filters: PostFilters = {},
  select: Array<keyof Post> = []
) => {
  const realSlug = slug.replace(/.md$/, "");
  const fullPath = path.join(postsDir, `${realSlug}.md`);
  const fileContent = await fsPromise.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContent);

  const post: Partial<Post> = {};

  post.date = data.date;
  post.pinned = data.pinned;

  select.forEach((field) => {
    if (field === "slug") {
      post[field] = realSlug;
    }
    if (field === "content") {
      post[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      post[field] = data[field];
    }
  });

  if (
    Object.keys(filters).every(
      (key) => (post as any)[key] === (filters as any)[key]
    )
  ) {
    return post;
  }
};

export const getAllPosts: IGetAllPosts = async (q = {}) => {
  const slugs = await getPostSlugs();
  let posts = [];
  for (const slug of slugs) {
    const post = await getPostBySlug(slug, q.filters, q.select);
    if (post) {
      posts.push(post);
    }
  }

  posts.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return a.date! - b.date!;
  });

  return posts;
};
