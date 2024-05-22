import { Button } from '@mui/material';
import { NavigateBefore } from '@mui/icons-material';
import type { FC } from 'react';

export const GoBack: FC = () => {
  return (
    <Button
      onClick={(): void => {
        window.history.back();
      }}
      startIcon={<NavigateBefore />}
      sx={{ height: '35px', padding: '16px 24px' }}
      variant={'contained'}
    >
      Voltar
    </Button>
  );
};
