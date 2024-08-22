import * as yup from 'yup';

export const loginSchema = {
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must contain at least 8 characters, one number and one letter'
    ),
};

export const registerSchema = {
  ...loginSchema,
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
};
