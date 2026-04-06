import slugify from "slugify";
import { nanoid } from "nanoid";

export const createResumeSlug = (title) => {
  const base = slugify(title || "resume", { lower: true, strict: true }) || "resume";
  return `${base}-${nanoid(6)}`;
};