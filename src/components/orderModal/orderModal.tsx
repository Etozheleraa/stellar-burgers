import { Modal, OrderInfo } from '@components';
import { useNavigate, useParams } from 'react-router-dom';

export const OrderModal = () => {
  const { number: orderNumber = '' } = useParams();
  const navigate = useNavigate();

  return (
    <Modal title={`#${orderNumber}`} onClose={() => navigate(-1)}>
      <OrderInfo />
    </Modal>
  );
};