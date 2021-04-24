export const toURLSafeString = (str: string): string =>
  encodeURI(str.toLowerCase().replace(/\s|\W/g, "-"));
