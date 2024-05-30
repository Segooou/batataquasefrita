import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { newFunctionalitySchema } from 'validation/schema';
import { queryClient } from 'infra/lib';
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
import type { Functionality } from 'domain/models';
import type { NewFunctionalityRequest } from 'validation/schema';

interface useDefaultFunctionalityProps {
  closeModal: () => void;
  functionality?: Functionality;
}
export const useDefaultFunctionality = ({
  closeModal,
  functionality
}: useDefaultFunctionalityProps): {
  errors: FieldErrors<NewFunctionalityRequest>;
  register: UseFormRegister<NewFunctionalityRequest>;
  onSubmit: SubmitHandler<NewFunctionalityRequest>;
  handleSubmit: UseFormHandleSubmit<NewFunctionalityRequest>;
  getValues: UseFormGetValues<NewFunctionalityRequest>;
  setValue: UseFormSetValue<NewFunctionalityRequest>;
  isSubmitting: boolean;
} => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,

    formState: { errors, isSubmitting }
  } = useForm<NewFunctionalityRequest>({
    resolver: yupResolver(newFunctionalitySchema)
  });

  const onSubmit: SubmitHandler<NewFunctionalityRequest> = async (data) => {
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

      closeModal();
      queryClient.invalidateQueries(QueryName.functionality);
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
