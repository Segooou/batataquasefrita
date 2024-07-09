/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Avatar } from '@mui/material';
import { type FC, useEffect } from 'react';
import { FormButton, LabelInput } from 'presentation/atomic-component/atom';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { UserFunctionalitiesFrom } from '../user-functionalities';
import { useUser } from 'data/use-case';
import { validate } from 'main/utils';
import type { Functionality, UserProps } from 'domain/models';
import type { SelectValues } from 'presentation/atomic-component/atom/select';

interface UserFromProps {
  user?: UserProps;
  closeModal: () => void;
  functionality: Pick<Functionality, 'id' | 'name' | 'platform'>[];
}

export const UserFrom: FC<UserFromProps> = ({ closeModal, user, functionality }) => {
  const { handleSubmit, onSubmit, register, errors, isSubmitting, getValues, setValue } = useUser({
    closeModal,
    user
  });

  const startUserFunctionalities: SelectValues[] = user?.userSeeFunctionality
    ? user?.userSeeFunctionality?.map((item) => {
        const func = functionality.find(
          (functionalityValues) => functionalityValues.id === item.functionalityId
        );

        return {
          label: `${func!.platform.name} - ${func!.name}`,
          value: String(func!.id)
        };
      })
    : [];

  useEffect(() => {
    if (user) {
      setValue('avatar', user.avatar, validate);
      setValue('username', user.username, validate);
      setValue('isNew', false, validate);
    } else setValue('isNew', true, validate);
  }, [user]);

  return (
    <div className={'flex gap-12 w-full'}>
      <form className={'flex flex-col gap-4 w-full'} onSubmit={handleSubmit(onSubmit)}>
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

      {user ? (
        <UserFunctionalitiesFrom
          functionality={functionality}
          startUserFunctionalities={startUserFunctionalities}
          user={user}
        />
      ) : null}
    </div>
  );
};
