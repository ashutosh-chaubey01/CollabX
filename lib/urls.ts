/**
 * Normalizes a URL string to ensure it has a protocol.
 * If no protocol is present, prepends https://
 * @param url - The URL string to normalize
 * @returns The normalized URL with protocol, or the original URL if invalid
 */
export function normalizeUrl(url: string | undefined): string {
  if (!url) return "";
  
  const trimmed = url.trim();
  if (!trimmed) return "";
  
  // If URL already has a protocol, return as is
  if (/^https?:\/\//.test(trimmed)) {
    return trimmed;
  }
  
  // If URL starts with //, assume https
  if (/^\/\//.test(trimmed)) {
    return `https:${trimmed}`;
  }
  
  // Otherwise prepend https://
  return `https://${trimmed}`;
}

/**
 * Validates if a string is a valid URL
 * @param url - The URL string to validate
 * @returns true if valid URL, false otherwise
 */
export function isValidUrl(url: string | undefined): boolean {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
