export const toURLSafeString = (str: string): string =>
  encodeURI(str.toLowerCase().replace(/\s|\W/g, "-"));

export const numLines = (str: string): number => str.split("\n").length;
