export type ApiResult<T> = {
  item: T;
  isSucceeded: boolean;
  errorCode: string;
  errorMessage: string | null;
  errorDescription?: string | null;
  stackTrace?: string | null;
  validationErrors?: unknown;
};

export type AuthUserItem = {
  userId: number;
  email: string;
  // Backend is transitioning from numeric userTypeId -> string userType.
  // Support both for now.
  userType?: string; // "SUPER_ADMIN" | "ORG_ADMIN" | etc.
  userTypeId?: number;
  token: string;
  hasSubscription?: boolean; // Default to true for now, will be used later
};


