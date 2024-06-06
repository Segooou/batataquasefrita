import { type FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout } from 'store/persist/slice';
import { paths } from 'main/config';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';

export const LoginRoute: FC = () => {
  const location = useLocation();

  const { accessToken } = useAppSelector((state) => state.persist);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.search.includes('?removeLogin=true') && accessToken !== null) {
      navigate(paths.login);
      dispatch(logout());
    }
  }, [navigate]);

  return <Outlet />;
};
