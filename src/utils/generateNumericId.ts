export const generateNumericId = () => {
  return crypto.getRandomValues(new Uint32Array(1))[0];
};
