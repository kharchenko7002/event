import type { FormValues } from "./types";

export function validate(values: FormValues): string | null {
  const name = values.name.trim();
  const email = values.email.trim().toLowerCase();

  if (name.length < 2) return "Skriv inn navn (minst 2 tegn).";
  if (!email.includes("@") || email.length < 5) return "Skriv inn en gyldig e-post.";
  return null;
}
