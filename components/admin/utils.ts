export function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!domain) return "***";

  if (name.length <= 1) return `*@${domain}`;
  if (name.length === 2) return `${name[0]}*@${domain}`;

  return `${name[0]}${"*".repeat(Math.max(1, name.length - 2))}${name[name.length - 1]}@${domain}`;
}
