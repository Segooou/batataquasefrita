import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { resolverError } from 'main/utils';
import { useForm } from 'react-hook-form';
import { userSchema } from 'validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import type {
  FieldErrors,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';
import type { UserProps } from 'domain/models';
import type { UserRequest } from 'validation/schema';

interface useUserProps {
  closeModal: () => void;
  user?: UserProps;
}
export const useUser = ({
  closeModal,
  user
}: useUserProps): {
  errors: FieldErrors<UserRequest>;
  register: UseFormRegister<UserRequest>;
  onSubmit: SubmitHandler<UserRequest>;
  handleSubmit: UseFormHandleSubmit<UserRequest>;
  getValues: UseFormGetValues<UserRequest>;
  setValue: UseFormSetValue<UserRequest>;
  isSubmitting: boolean;
} => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,

    formState: { errors, isSubmitting }
  } = useForm<UserRequest>({
    resolver: yupResolver(userSchema)
  });

  const onSubmit: SubmitHandler<UserRequest> = async (data) => {
    try {
      if (user)
        await api.put({
          body: data,
          id: user.id,
          route: apiPaths.user
        });
      else
        await api.post({
          body: data,
          route: apiPaths.user
        });

      closeModal();
      queryClient.invalidateQueries(QueryName.user);
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
