/**
 * @param {string} url
 * @param {import('zod').ZodType} schema
 */
export async function fetchAndParse(url, schema) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  const data = await res.json();
  return schema.parse(data);
}
