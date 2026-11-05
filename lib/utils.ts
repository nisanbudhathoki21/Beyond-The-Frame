import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function formatNPR(amount: number): string {
  return new Intl.NumberFormat("en-NP", { style: "currency", currency: "NPR", maximumFractionDigits: 0 }).format(amount);
}
export function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g,""); }
