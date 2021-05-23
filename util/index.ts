export const toURLSafeString = (str: string): string =>
  encodeURI(str.toLowerCase().replace(/\s|\W/g, "-"));

export const numLines = (str: string): number => str.split("\n").length;

export const compareDateStrings = (a: string, b: string) =>
  new Date(a).getTime() - new Date(b).getTime();

export const secondsToTimeString = (time: number) => {
  const minutes = (~~(time / 60)).toString().padStart(2, "0");
  const seconds = (~~(time % 60)).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
};
