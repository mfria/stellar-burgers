import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../src/services/store';
import { getUserOrders } from '../../../src/services/feeds/actions';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((store) => store.feeds.userOrders);
  const isLoading = useSelector((store) => store.feeds.isLoading);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
