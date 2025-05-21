import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import '../../index.css';
import styles from './app.module.css';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { ProtectedRoute } from '../protected-route/protected-route';
import { fetchIngredients } from '../../services/ingredientSlice';
import { OrderModal } from '../orderModal/orderModal';
import { IngredientModal } from '../ingredientModal/ingredientModal';
import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import { fetchUser } from '../../services/userSlice';

const App = () => {
  const dispatcher = useDispatch();
  const location = useLocation();
  const prevLocationState = location.state?.background;

  useEffect(() => {
    dispatcher(fetchUser());
    dispatcher(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        {prevLocationState ? (
          <>
            <Route path='/feed/:number' element={<Feed />} />
            <Route path='/ingredients/:id' element={<ConstructorPage />} />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
          </>
        ) : (
          <>
            <Route path='/feed/:number' element={<OrderInfo />} />
            <Route path='/ingredients/:id' element={<IngredientDetails />} />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />
          </>
        )}
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {prevLocationState && (
        <Routes>
          <Route path='/feed/:number' element={<OrderModal />} />
          <Route path='/ingredients/:id' element={<IngredientModal />} />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <OrderModal />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;