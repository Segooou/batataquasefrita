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
import type { NewFunctionality } from 'domain/models';
import type { NewFunctionalityRequest } from 'validation/schema';

interface useNewFunctionalityProps {
  closeModal: () => void;
  newFunctionality?: NewFunctionality;
}
export const useNewFunctionality = ({
  closeModal,
  newFunctionality
}: useNewFunctionalityProps): {
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
      if (newFunctionality)
        await api.put({
          body: data,
          id: newFunctionality.id,
          route: apiPaths.newFunctionality
        });
      else
        await api.post({
          body: data,
          route: apiPaths.newFunctionality
        });

      closeModal();
      queryClient.invalidateQueries(QueryName.newFunctionality);
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
