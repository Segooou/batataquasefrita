import { Button, CircularProgress } from '@mui/material';
import type { FC } from 'react';

interface FormButtonProps {
  isSubmitting: boolean;
  label: string;
  id?: string;
  disableRipple?: boolean;
}

export const FormButton: FC<FormButtonProps> = ({ isSubmitting, disableRipple, label, id }) => (
  <Button
    className={'w-full flex gap-2'}
    disableRipple={disableRipple}
    id={id ?? 'form-button'}
    size={'large'}
    type={isSubmitting ? 'button' : 'submit'}
    variant={'contained'}
  >
    {isSubmitting ? (
      <span className={'h-[20px]'}>
        <CircularProgress size={20} sx={{ color: 'white', padding: '0' }} thickness={5} />
      </span>
    ) : null}

    {isSubmitting ? <span>Carregando</span> : <span>{label}</span>}
  </Button>
);
