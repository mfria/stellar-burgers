import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../src/services/store';
import { getFeeds } from '../../../src/services/feeds/actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const { orders, isLoading } = useSelector((store) => store.feeds);

  useEffect(() => {
    if (!orders || !orders.length) {
      dispatch(getFeeds());
    }
  }, [orders]);

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
