import { type FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { paths } from 'main/config';
import { tokenIsExpired } from 'main/utils';

export const LoginRoute: FC = () => {
  const isExpired = tokenIsExpired();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isExpired) navigate(paths.home);
  }, [isExpired, navigate]);

  return isExpired ? <Outlet /> : null;
};
