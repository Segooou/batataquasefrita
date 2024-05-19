import { LoginForm } from 'presentation/atomic-component/molecule/form';
import type { FC } from 'react';

export const AuthContent: FC = () => {
  return (
    <div
      className={
        'flex flex-col gap-8 py-4 overflow-auto justify-center tablet:w-[400px] mx-6 tablet:mx-auto'
      }
    >
      <div className={'text-white font-bold text-2xl'}>Login</div>
      <LoginForm />
    </div>
  );
};
