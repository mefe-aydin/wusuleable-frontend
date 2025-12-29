export type UserType = "SUPER_ADMIN" | "ORG_ADMIN";

// TODO: Confirm these IDs with backend constants and update if needed.
const USER_TYPE_BY_ID: Record<string, UserType> = {
  // Common convention:
  "10000": "SUPER_ADMIN",
  "10001": "ORG_ADMIN",
};

export function userTypeFromId(userTypeId: string | number | null | undefined): UserType | null {
  if (userTypeId === null || userTypeId === undefined) return null;
  const key = String(userTypeId);
  return USER_TYPE_BY_ID[key] ?? null;
}


