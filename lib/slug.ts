import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 8);

function slugifyName(fullName: string) {
  return fullName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 20);
}

export async function generateUserSlug(
  fullName: string,
  exists: (slug: string) => Promise<boolean>
) {
  const base = slugifyName(fullName) || "user";

  for (let i = 0; i < 5; i += 1) {
    const candidate = `${base}-${nanoid()}`;
    const taken = await exists(candidate);
    if (!taken) {
      return candidate;
    }
  }

  // final fallback with random slug if all attempts failed
  return `${base}-${nanoid()}-${nanoid()}`;
}

