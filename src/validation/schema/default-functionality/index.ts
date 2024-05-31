import { InputType } from 'domain/models';
import { array, boolean, mixed, number, object, string } from 'yup';
import type { InferType } from 'yup';

const inputTypeValues = Object.values(InputType);

export const inputPropsSchema = object().shape({
  formValue: string().required(),
  isRequired: boolean().required(),
  label: string().required(),
  placeholder: string().required(),
  type: mixed().oneOf(inputTypeValues).required()
});

export const defaultFunctionalitySchema = object().shape({
  active: boolean().required(),
  apiRoute: string().nullable(),
  from: string().nullable(),
  indexToGet: array().of(number().required()).nullable(),
  // inputProps: array().of(inputPropsSchema).min(1).required(),
  messageNotFound: string().nullable(),
  messageOnFind: string().nullable(),
  name: string().required(),
  platformId: number().required(),
  regex: string().nullable(),
  subject: array().of(string().required()).nullable(),
  text: array().of(string().required()).nullable(),
  textToReplace: array()
});

export type DefaultFunctionalityRequest = InferType<typeof defaultFunctionalitySchema>;
