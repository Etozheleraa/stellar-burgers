import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, userSelectors } from '../../services/userSlice';
import { Preloader } from '@ui';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const loginError = useSelector(userSelectors.loginError);
  const isLoadingLogin = useSelector(userSelectors.isLoadingLogin);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    
    dispatch(loginUser({ email, password }))
      .then(() => {
        if (location.state?.from) {
          navigate(location.state.from);
        }
      });
  };

  if (isLoadingLogin) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={loginError}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
