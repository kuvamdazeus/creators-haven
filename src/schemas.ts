import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().nonempty(),
  tagline: z.string().nonempty(),
  bio: z.string().nonempty(),
  coverImageUrl: z.string().nonempty(),
  profileImageUrl: z.string().nonempty(),
  profileLinks: z.object({
    github: z.string().default(""),
    twitter: z.string().default(""),
    linkedin: z.string().default(""),
    instagram: z.string().default(""),
    dribbble: z.string().default(""),
    blog: z.string().default(""),
    website: z.string().default(""),
  }),
});
