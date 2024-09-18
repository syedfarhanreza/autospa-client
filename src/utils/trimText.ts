export const trimText = (text: string, toTrim: number) => {
  const isLarger = text.length > toTrim;
  return isLarger ? text.substring(0, toTrim) + "..." : text;
};
