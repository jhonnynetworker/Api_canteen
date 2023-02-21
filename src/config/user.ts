export let userEmail: string | null = null;

export async function setUserEmail(email: string): Promise<void> {
  console.log('Email recebido:', email);
  userEmail = email;
}

export function getEmail(): string {
  return userEmail || "";
}
