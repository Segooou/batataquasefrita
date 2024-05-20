import { SendEmailForm } from 'presentation/atomic-component/molecule/form';
import type { FC } from 'react';

export const StackContent: FC = () => {
  return (
    <div className={'flex flex-col w-full gap-4 text-blue-semiDark py-8 px-4 '}>
      <SendEmailForm />
      <div className={'h-screen'} />
    </div>
  );
};
