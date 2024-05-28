import { Outlet, useNavigate } from 'react-router-dom';
import { Role } from 'domain/models';
import { getUser } from 'store/persist/selector';
import { paths } from 'main/config';
import { tokenIsExpired } from 'main/utils';
import { useEffect } from 'react';
import type { FC } from 'react';

export const AdminRoute: FC = () => {
  const isExpired = tokenIsExpired();

  const navigate = useNavigate();

  const { role } = getUser();

  useEffect(() => {
    if (isExpired) navigate(paths.login);
    if (role !== Role.admin) navigate(paths.home);
  }, [isExpired, navigate, role]);

  return isExpired ? null : <Outlet />;
};
