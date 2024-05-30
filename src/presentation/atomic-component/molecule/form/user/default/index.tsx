import { Avatar } from '@mui/material';
import { type FC, useEffect } from 'react';
import { FormButton, LabelInput } from 'presentation/atomic-component/atom';
import { useUser } from 'data/use-case';
import { validate } from 'main/utils';
import type { UserProps } from 'domain/models';

interface UserFromProps {
  user?: UserProps;
  closeModal: () => void;
}

export const UserFrom: FC<UserFromProps> = ({ closeModal, user }) => {
  const { handleSubmit, onSubmit, register, errors, isSubmitting, getValues, setValue } = useUser({
    closeModal,
    user
  });

  useEffect(() => {
    if (user) {
      setValue('avatar', user.avatar, validate);
      setValue('username', user.username, validate);
      setValue('isNew', false, validate);
    } else setValue('isNew', true, validate);
  }, [user]);

  return (
    <form className={'flex flex-col gap-4'} onSubmit={handleSubmit(onSubmit)}>
      <LabelInput
        error={!!errors.username}
        label={'Nome do usuário'}
        placeholder={'Digite o nome do usuário'}
        register={register('username')}
        required
      />

      <LabelInput
        error={!!errors.password}
        label={user ? 'Nova senha' : 'Senha'}
        placeholder={user ? 'Deixe em branco para manter a mesma senha' : 'Digite a senha'}
        register={register('password')}
        required={!user}
      />

      <LabelInput
        error={!!errors.avatar}
        label={'Url do avatar'}
        onChange={(event): void => setValue('avatar', event.target.value, validate)}
        placeholder={'Digite a url do avatar'}
        register={register('avatar')}
      />

      {getValues('avatar') ? (
        <div className={'flex justify-center'}>
          <Avatar
            src={getValues('avatar') ?? ''}
            sx={{
              height: '100px',
              width: '100px'
            }}
          />
        </div>
      ) : null}

      <FormButton disableRipple isSubmitting={isSubmitting} label={'Enviar'} />
    </form>
  );
};
