import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { recoverPasswordSchema } from 'validation/schema';
import { resolverError } from 'main/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type {
  FieldErrors,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';
import type { RecoverPasswordRequest } from 'validation/schema';

interface useRecoverPasswordProps {
  openModal: () => void;
}

export const useRecoverPassword = ({
  openModal
}: useRecoverPasswordProps): {
  errors: FieldErrors<RecoverPasswordRequest>;
  register: UseFormRegister<RecoverPasswordRequest>;
  onSubmit: SubmitHandler<RecoverPasswordRequest>;
  handleSubmit: UseFormHandleSubmit<RecoverPasswordRequest>;
  getValues: UseFormGetValues<RecoverPasswordRequest>;
  setValue: UseFormSetValue<RecoverPasswordRequest>;
  isSubmitting: boolean;
} => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<RecoverPasswordRequest>({
    resolver: yupResolver(recoverPasswordSchema)
  });

  const onSubmit: SubmitHandler<RecoverPasswordRequest> = async (data) => {
    try {
      await api.post({
        body: data,
        route: apiPaths.resetPassword
      });

      openModal();
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
