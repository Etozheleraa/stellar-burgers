import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Navigate, useParams } from 'react-router-dom';
import { ingredientsSelectors } from '../../services/ingredientSlice';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useSelector(ingredientsSelectors.get);
  const isLoading = useSelector(ingredientsSelectors.isLoading);
  const ingredientData = ingredients.find(item => item._id === id);

  if (isLoading) {
    return <Preloader/>;
  }

  if (!ingredientData) {
    return <Navigate to='/404' />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};