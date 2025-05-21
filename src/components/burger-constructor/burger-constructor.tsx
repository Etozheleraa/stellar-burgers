import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { burgerConstructorActions, burgerConstructorSelectors } from '../../services/constructorSlice';
import { makeOrder, orderActions, orderSelectors } from '../../services/orderSlice';
import { userSelectors } from '../../services/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const constructorItems = useSelector(
    burgerConstructorSelectors.getConstructorState
  );
  const isOrderLoading = useSelector(orderSelectors.isLoadingConstructorOrder);
  const orderModalData = useSelector(orderSelectors.getConstructorOrder);
  const isAuthorized = useSelector(userSelectors.isAuthorized);

  const handleOrderClick = () => {
    if (!isAuthorized) {
      navigate('/login', { state: { from: location } });
      return;
    }
    if (!constructorItems.bun || isOrderLoading) return;

    const orderRequest = [constructorItems.bun._id]
      .concat(constructorItems.ingredients.map((i) => i._id))
      .concat(constructorItems.bun._id);

    dispatch(makeOrder(orderRequest));
  };

  const handleCloseModal = () => {
    dispatch(orderActions.clearConstructorOrder());
    dispatch(burgerConstructorActions.resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, ingredient: TConstructorIngredient) => sum + ingredient.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isOrderLoading}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseModal}
    />
  );
};