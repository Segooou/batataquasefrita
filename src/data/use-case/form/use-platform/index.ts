import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { platformSchema } from 'validation/schema';
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
import type { Platform } from 'domain/models';
import type { PlatformRequest } from 'validation/schema';

interface usePlatformProps {
  closeModal: () => void;
  platform?: Platform;
}
export const usePlatform = ({
  closeModal,
  platform
}: usePlatformProps): {
  errors: FieldErrors<PlatformRequest>;
  register: UseFormRegister<PlatformRequest>;
  onSubmit: SubmitHandler<PlatformRequest>;
  handleSubmit: UseFormHandleSubmit<PlatformRequest>;
  getValues: UseFormGetValues<PlatformRequest>;
  setValue: UseFormSetValue<PlatformRequest>;
  isSubmitting: boolean;
} => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,

    formState: { errors, isSubmitting }
  } = useForm<PlatformRequest>({
    resolver: yupResolver(platformSchema)
  });

  const onSubmit: SubmitHandler<PlatformRequest> = async (data) => {
    try {
      if (platform)
        await api.put({
          body: data,
          id: platform.id,
          route: apiPaths.platform
        });
      else
        await api.post({
          body: data,
          route: apiPaths.platform
        });

      closeModal();
      queryClient.invalidateQueries(QueryName.platform);
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
