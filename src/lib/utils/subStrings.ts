/**
 * Возвращает полученную подстроку и остаток непроверенной строки
 */
const findSubString = (str: string, start: string, end: string): string[] => {
  if (!str.length) return ['', ''];
  let string = str;
  const iStart = string.indexOf(start);
  if (iStart < 0) return ['', ''];
  string = string.slice(iStart + start.length);
  if (!end) return [string, ''];
  const iEnd = string.indexOf(end);
  if (iEnd < 0) return ['', ''];
  return [string.slice(0, iEnd), string.slice(iEnd + end.length)];
};

const findSubStringsArray = (str: string, start: string, end: string): string[] => {
  if (!str.length) return [];

  const [subStr, remains] = findSubString(str, start, end);
  if (!subStr) return [];
  return [subStr].concat(findSubStringsArray(remains, start, end));
};

export const findSubStrings = (str: string, subStrings: string[]): string[] => {
  const result: string[] = [];
  subStrings.forEach((subStr) => {
    const [start, end]: string[] = subStr.split('*');
    const value = findSubStringsArray(str, start, end);
    if (value) result.push(...value);
  });
  return result;
};
