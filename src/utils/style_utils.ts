import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(" ");
}
