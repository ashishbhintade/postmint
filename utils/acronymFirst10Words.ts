export function acronymFirst10Words(title: string): string {
  return title
    .split(/\s+/)
    .slice(0, 10)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");
}
