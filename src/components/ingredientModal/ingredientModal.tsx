import { IngredientDetails, Modal } from '@components';
import { useNavigate } from 'react-router-dom';

export const IngredientModal = () => {
  const navigate = useNavigate();

  return (
    <Modal title={`Детали ингридиента`} onClose={() => navigate(-1)}>
      <IngredientDetails />
    </Modal>
  );
};