import { number, object, string } from 'yup';
import type { InferType } from 'yup';

export const defaultFunctionalitySchema = object().shape({
  description: string().required(),
  name: string().required(),
  platformId: number().required()
});

export type DefaultFunctionalityRequest = InferType<typeof defaultFunctionalitySchema>;
