import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function acronymFirst10Words(title: string): string {
  return title
    .split(/\s+/)
    .slice(0, 10)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");
}
