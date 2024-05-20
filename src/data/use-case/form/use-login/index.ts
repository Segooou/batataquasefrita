import { api } from 'infra/http';
import { apiPaths, paths } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import { getRedirectPath } from 'store/redirect/selector';
import { loginSchema } from 'validation/schema';
import { setAuth } from 'store/persist/slice';
import { setRedirect } from 'store/redirect/slice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import type {
  FieldErrors,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';
import type { LoginRequest } from 'validation/schema';
import type { LoginResponse } from 'domain/models';

export const useLogin = (): {
  errors: FieldErrors<LoginRequest>;
  register: UseFormRegister<LoginRequest>;
  onSubmit: SubmitHandler<LoginRequest>;
  handleSubmit: UseFormHandleSubmit<LoginRequest>;
  getValues: UseFormGetValues<LoginRequest>;
  setValue: UseFormSetValue<LoginRequest>;
  isSubmitting: boolean;
  errorMessage: string | null;
} => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    setValue,
    getValues,

    formState: { errors, isSubmitting }
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema)
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const { accessToken, user } = await api.post<LoginResponse>({
        body: data,
        route: apiPaths.auth
      });

      dispatch(
        setAuth({
          accessToken,
          user
        })
      );

      setErrorMessage(null);
      callToast.success('logado com sucesso');
      const path = getRedirectPath();

      dispatch(setRedirect({ path: null }));
      navigate(path === null || path === '/' ? paths.home : path);
    } catch (error) {
      resolverError(error);
      setErrorMessage('Usuário ou senha incorreto(s), verifique seus dados.');
    }
  };

  return {
    errorMessage,
    errors,
    getValues,
    handleSubmit,
    isSubmitting,
    onSubmit,
    register,
    setValue
  };
};
