import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../services/userSlice';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactNode;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const { pathname } = useLocation();
  const isLoading = useSelector(userSelectors.isLoading);
  const isAuthorized = useSelector(userSelectors.isAuthorized);

  if (isLoading) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuthorized) {
    return <Navigate replace to='/' state={{ from: pathname }} />;
  }

  if (!onlyUnAuth && !isAuthorized)
    return <Navigate replace to='/login' state={{ from: pathname }} />;

  return children;
};
