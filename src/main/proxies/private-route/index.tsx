import { Outlet, useNavigate } from 'react-router-dom';
import { paths } from 'main/config';
import { setRedirect } from 'store/redirect/slice';
import { tokenIsExpired } from 'main/utils';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { FC } from 'react';
import type { RouteProps } from 'react-router-dom';

type PrivateRouteProps = RouteProps & {
  isRedirect?: boolean;
};

export const PrivateRoute: FC<PrivateRouteProps> = ({ isRedirect }) => {
  const isExpired = tokenIsExpired();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = window.location.href.replace(window.location.origin, '');

  useEffect(() => {
    if (isRedirect) navigate(paths.login);
    if (isExpired) {
      dispatch(setRedirect({ path }));
      navigate(paths.login);
    }
  }, [isExpired, navigate, isRedirect]);

  return isExpired ? null : <Outlet />;
};
