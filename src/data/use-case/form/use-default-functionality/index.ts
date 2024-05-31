import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { callToast, resolverError } from 'main/utils';
import { defaultFunctionalitySchema } from 'validation/schema';
import { queryClient } from 'infra/lib';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { DefaultFunctionalityRequest } from 'validation/schema';
import type {
  FieldErrors,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';
import type { Functionality } from 'domain/models';

interface useDefaultFunctionalityProps {
  closeModal?: () => void;
  functionality?: Functionality;
}
export const useDefaultFunctionality = ({
  closeModal,
  functionality
}: useDefaultFunctionalityProps): {
  errors: FieldErrors<DefaultFunctionalityRequest>;
  register: UseFormRegister<DefaultFunctionalityRequest>;
  onSubmit: SubmitHandler<DefaultFunctionalityRequest>;
  handleSubmit: UseFormHandleSubmit<DefaultFunctionalityRequest>;
  getValues: UseFormGetValues<DefaultFunctionalityRequest>;
  setValue: UseFormSetValue<DefaultFunctionalityRequest>;
  isSubmitting: boolean;
} => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,

    formState: { errors, isSubmitting }
  } = useForm<DefaultFunctionalityRequest>({
    resolver: yupResolver(defaultFunctionalitySchema)
  });

  const onSubmit: SubmitHandler<DefaultFunctionalityRequest> = async (data) => {
    try {
      if (functionality)
        await api.put({
          body: data,
          id: functionality.id,
          route: apiPaths.functionality
        });
      else
        await api.post({
          body: data,
          route: apiPaths.functionality
        });

      if (closeModal) closeModal();
      queryClient.invalidateQueries(QueryName.functionality);
      callToast.success('Atualizado com sucesso');
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
