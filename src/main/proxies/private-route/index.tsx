import { Outlet, useNavigate } from 'react-router-dom';
import { paths } from 'main/config';
import { tokenIsExpired } from 'main/utils';
import { useEffect } from 'react';
import type { FC } from 'react';
import type { RouteProps } from 'react-router-dom';

type PrivateRouteProps = RouteProps & {
  isRedirect?: boolean;
};

export const PrivateRoute: FC<PrivateRouteProps> = ({ isRedirect }) => {
  const isExpired = tokenIsExpired();

  const navigate = useNavigate();

  useEffect(() => {
    if (isRedirect) navigate(paths.login);
    if (isExpired) navigate(paths.login);
  }, [isExpired, navigate, isRedirect]);

  return isExpired ? null : <Outlet />;
};
