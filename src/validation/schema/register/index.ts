import { object, ref, string } from 'yup';
import type { InferType } from 'yup';

export const registerSchema = object().shape({
  email: string().email().required(),
  entity: string().required(),
  fullName: string().required(),
  occupation: string().required(),
  password: string().required(),
  passwordConfirmation: string()
    .required()
    .oneOf([ref('password')]),
  phone: string().required()
});

export type RegisterRequest = InferType<typeof registerSchema>;
