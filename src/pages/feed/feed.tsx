import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectLoadingStatus, selectOrders, fetchFeeds} from '../../services/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoadingStatus);
  const orders = useSelector(selectOrders);

  const handleFetchFeeds = () => dispatch(fetchFeeds());

  useEffect(() => {
    handleFetchFeeds();
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleFetchFeeds} />;
};