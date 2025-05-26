import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../../src/services/store';
import { useNavigate } from 'react-router-dom';
import { orderBurger } from '../../../src/services/orderConstructor/actions';
import { resetModalData } from '../../../src/services/orderConstructor/slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  /* const constructorItems = {
    bun: {
      price: 0
    },
    ingredients: []
  };
  const orderRequest = false;
  const orderModalData = null;*/
  const { constructorItems, orderRequest, orderModalData } = useSelector(
    (state) => state.orderConstructor
  );

  const orderItemsList = () => {
    const bunId = constructorItems.bun?._id as string;
    const ingredientsIds = constructorItems.ingredients.map((item) => item._id);
    return [bunId, bunId, ...ingredientsIds];
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (user) {
      dispatch(orderBurger(orderItemsList()));
    } else {
      navigate('/login', { state: { from: '/' } });
    }
  };
  const closeOrderModal = () => {
    dispatch(resetModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
