import { object, string } from 'yup';
import type { InferType } from 'yup';

export const platformSchema = object().shape({
  description: string(),
  image: string().required(),
  name: string().required()
});

export type PlatformRequest = InferType<typeof platformSchema>;
