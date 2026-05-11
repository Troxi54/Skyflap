import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

export function getCurrentTime() {
  return Date.now();
}

TimeAgo.addDefaultLocale(en);

export const timeAgo = new TimeAgo("en");
