import { object, string } from 'yup';
import type { InferType } from 'yup';

export const platformSchema = object().shape({
  image: string().required(),
  name: string().required()
});

export type PlatformRequest = InferType<typeof platformSchema>;
