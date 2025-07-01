export const getSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "-");
};
