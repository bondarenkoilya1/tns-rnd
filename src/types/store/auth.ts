export type UserProps = {
  username: string;
  email: string;
  password: string;
};

export type useAuthStoreProps = {
  userData: UserProps;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  setField: <K extends keyof UserProps>(field: K, value: UserProps[K]) => void;
  registerUser: () => Promise<void>;
};
