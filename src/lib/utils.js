import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}
