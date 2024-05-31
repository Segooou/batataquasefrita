import { number, object, string } from 'yup';
import type { InferType } from 'yup';

export const newFunctionalitySchema = object().shape({
  description: string().required(),
  name: string().required(),
  platformId: number().required()
});

export type NewFunctionalityRequest = InferType<typeof newFunctionalitySchema>;
