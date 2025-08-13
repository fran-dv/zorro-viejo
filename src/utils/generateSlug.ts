export const generateSlug = (str: string) => {
  if (!str) return "";
  return str
    .trim()
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
};
