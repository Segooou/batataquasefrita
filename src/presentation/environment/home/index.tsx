import { SendEmailForm } from 'presentation/atomic-component/molecule/form';
import type { FC } from 'react';

export const HomeContent: FC = () => {
  return (
    <div className={'flex flex-col gap-4 text-blue-semiDark py-8'}>
      <SendEmailForm />
    </div>
  );
};
