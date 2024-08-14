import { padZero } from "./format";

export function getCurrentDate() {
  return new Date();
}

export function formatDate(day: Date) {
  return `${day.getFullYear()}-${padZero(day.getMonth() + 1, 2)}-${padZero(day.getDate(), 2)}`;
}

// TODO: データ型作ってしまうとかも考える
export function isValidDateString(str: string): boolean {
  return /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(str);
}
