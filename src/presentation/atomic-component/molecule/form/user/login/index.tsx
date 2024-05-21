import { ErrorDiv, FormButton, LabelInput } from 'presentation/atomic-component/atom';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLogin } from 'data/use-case';
import { useState } from 'react';
import type { FC } from 'react';

export const LoginForm: FC = () => {
  const { handleSubmit, onSubmit, register, errors, errorMessage, isSubmitting } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={'flex flex-col gap-4 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <LabelInput
        autoCapitalize={'none'}
        error={!!errors.username}
        label={'Nome de usuário'}
        placeholder={'Digite seu Nome de usuário'}
        register={register('username')}
      />

      <LabelInput
        EndIcon={
          <InputAdornment position={'end'}>
            <IconButton onClick={handleClickShowPassword} tabIndex={-1}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        error={!!errors.password}
        label={'Senha'}
        placeholder={'Digite sua senha'}
        register={register('password')}
        type={showPassword ? 'text' : 'password'}
      />

      <div className={'flex flex-col gap-4 mt-2'}>
        <FormButton isSubmitting={isSubmitting} label={'Entrar'} />
        {errorMessage ? <ErrorDiv text={errorMessage} /> : null}
      </div>
    </form>
  );
};
