import { Outlet, useNavigate } from 'react-router-dom';
import { Role } from 'domain/models';
import { getUser } from 'store/persist/selector';
import { paths } from 'main/config';
import { setRedirect } from 'store/redirect/slice';
import { tokenIsExpired } from 'main/utils';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { FC } from 'react';

export const AdminRoute: FC = () => {
  const isExpired = tokenIsExpired();

  const navigate = useNavigate();

  const { role } = getUser();
  const dispatch = useDispatch();
  const path = window.location.href.replace(window.location.origin, '');

  useEffect(() => {
    if (isExpired) navigate(paths.login);
    if (role !== Role.admin) {
      dispatch(setRedirect({ path }));
      navigate(paths.home);
    }
  }, [isExpired, navigate, role]);

  return isExpired ? null : <Outlet />;
};
