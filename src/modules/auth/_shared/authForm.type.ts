export type RegisterForm = {
  email?: string;
  password?: string;
  resetPassword?: string;
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
};

export type LoginForm = {
  email?: string;
  password?: string;
};
