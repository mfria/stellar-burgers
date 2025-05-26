import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../../src/services/store';

export const AppHeader: FC = () => (
  <AppHeaderUI userName={useSelector((store) => store.auth.user?.name)} />
);
