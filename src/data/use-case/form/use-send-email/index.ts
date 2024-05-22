import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { resolverError } from 'main/utils';
import { sendEmailSchema } from 'validation/schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Dispatch, SetStateAction } from 'react';
import type {
  FieldErrors,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';
import type { SendEmailRequest } from 'validation/schema';

interface useSendEmailProps {
  setValueI: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<boolean>>;
}
export const useSendEmail = ({
  setValueI,
  setError
}: useSendEmailProps): {
  errors: FieldErrors<SendEmailRequest>;
  register: UseFormRegister<SendEmailRequest>;
  onSubmit: SubmitHandler<SendEmailRequest>;
  handleSubmit: UseFormHandleSubmit<SendEmailRequest>;
  getValues: UseFormGetValues<SendEmailRequest>;
  setValue: UseFormSetValue<SendEmailRequest>;
  isSubmitting: boolean;
} => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,

    formState: { errors, isSubmitting }
  } = useForm<SendEmailRequest>({
    resolver: yupResolver(sendEmailSchema)
  });

  const onSubmit: SubmitHandler<SendEmailRequest> = async (data) => {
    try {
      setError(false);
      setValueI('');

      const response = await api.post<string[]>({
        body: data,
        route: apiPaths.email
      });

      if (response?.length > 0) setValueI(response[0]);
      else {
        setError(true);
        setValueI('E-mail não encontrado');
      }
    } catch (error) {
      resolverError(error);
    }
  };

  return {
    errors,
    getValues,
    handleSubmit,
    isSubmitting,
    onSubmit,
    register,
    setValue
  };
};
