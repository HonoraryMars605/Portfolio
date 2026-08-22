import { SITE } from "@site-config"
import { getCollection } from "astro:content"
import rss from "@astrojs/rss"
import type { APIContext } from "astro"

export async function GET(context: APIContext) {
  const projects = await getCollection("projects")
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items: projects.map((project) => ({
      title: project.data.title,
      description: project.data.description || "",
      pubDate: new Date(),
      link: `/projects/${project.slug}`,
    })),
  })
}
