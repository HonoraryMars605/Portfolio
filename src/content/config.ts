import { defineCollection, z } from "astro:content"
import { ProjectTypeSchema } from "@/schemas"
import { createLocalDate } from "@/lib/date-utils"
import { dedupPreserveCase } from "@/lib/string-manipulation"

const yearMonthDateSchema = z
  .union([z.date(), z.string().transform(createLocalDate)])
  .describe("Should be valid YYYY-MM format.")

const projects = defineCollection({
  type: "content",
  schema: z
    .object({
      title: z.string().max(75),
      selected: z.boolean().default(false),
      fromDate: yearMonthDateSchema.optional(),
      toDate: yearMonthDateSchema.optional(),
      code: z.string().url().optional(),
      doc: z.string().url().optional(),
      paper: z.string().url().optional(),
      url: z.string().url().optional(),
      release: z.string().url().optional(),
      types: z.array(ProjectTypeSchema).default([]),
      skills: z
        .array(z.string().trim().min(1))
        .default([])
        .transform((arr) => dedupPreserveCase(arr)),
      description: z.string().max(200).optional(),
      itchId: z.string().optional(),
      itchUrl: z.string().url().optional(),
      role: z.string().optional(),
      date: z.string().optional(),
      tags: z.array(z.string()).optional(),
    })
    .refine(
      (data) => !data.fromDate || !data.toDate || data.toDate >= data.fromDate,
      {
        message: "End date must be on or after start date",
      },
    ),
})

const data = defineCollection({
  type: "data",
  schema: z.any(),
})

export const collections = {
  projects,
  data,
}
