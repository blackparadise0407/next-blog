import { MetadataRoute } from "next";

import { getAllPosts } from "./lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [
    {
      url: "https://elykp.com",
      lastModified: new Date(),
      priority: 1,
    },
  ];

  const posts = await getAllPosts({
    select: ["slug", "date"],
  });

  return urls.concat(
    posts.map((it) => ({
      url: `https://elykp.com/${it.slug}`,
      lastModified: new Date(it.date!),
      priority: 0.8,
    }))
  );
}
