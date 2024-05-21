import { object, ref, string } from 'yup';
import type { InferType } from 'yup';

// Login
export const loginSchema = object().shape({
  password: string().required(),
  username: string().required()
});

export type LoginRequest = InferType<typeof loginSchema>;

// Send Email
export const sendEmailSchema = object().shape({
  email: string().email().required(),
  password: string().required()
});

export type SendEmailRequest = InferType<typeof sendEmailSchema>;

// Recover Password
export const recoverPasswordSchema = object().shape({
  code: string().required(),
  password: string().required(),
  passwordConfirmation: string().oneOf([ref('password')], 'As senhas não coincidem')
});

export type RecoverPasswordRequest = InferType<typeof recoverPasswordSchema>;
