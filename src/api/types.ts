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
  userTypeId: number;
  token: string;
};


