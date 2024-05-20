import { SendEmailForm } from 'presentation/atomic-component/molecule/form';
import type { FC } from 'react';

export const StackContent: FC = () => {
  return (
    <div className={''}>
      <SendEmailForm />
      <div className={'h-screen'} />
    </div>
  );
};
