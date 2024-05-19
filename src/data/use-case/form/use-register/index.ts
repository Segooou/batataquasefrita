import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { registerSchema } from 'validation/schema';
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
import type { LoginResponse } from 'domain/models';
import type { RegisterRequest } from 'validation/schema';

interface useRegisterProps {
  openSuccessModal: () => void;
  openErrorModal: () => void;
}

export const useRegister = ({
  openErrorModal,
  openSuccessModal
}: useRegisterProps): {
  errors: FieldErrors<RegisterRequest>;
  register: UseFormRegister<RegisterRequest>;
  onSubmit: SubmitHandler<RegisterRequest>;
  handleSubmit: UseFormHandleSubmit<RegisterRequest>;
  getValues: UseFormGetValues<RegisterRequest>;
  setValue: UseFormSetValue<RegisterRequest>;
  isSubmitting: boolean;
} => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,

    formState: { errors, isSubmitting }
  } = useForm<RegisterRequest>({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    try {
      await api.post<LoginResponse>({
        body: data,
        route: apiPaths.auth
      });
      openSuccessModal();
    } catch {
      openErrorModal();
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
