import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            clsx(styles.link, {
              [styles.link_active]: isActive
            })
          }
        >
          <BurgerIcon
            type={location.pathname === '/' ? 'primary' : 'secondary'}
            className=''
          />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </NavLink>
        <NavLink
          to={'/feed'}
          className={({ isActive }) =>
            clsx(styles.link, {
              [styles.link_active]: isActive
            })
          }
        >
          <ListIcon
            type={location.pathname === '/feed' ? 'primary' : 'secondary'}
            className=''
          />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </NavLink>
      </div>
      <div className={styles.logo}>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            clsx(styles.link, {
              [styles.link_active]: isActive
            })
          }
        >
          <Logo className='' />
        </NavLink>
      </div>
      <div className={styles.link_position_last}>
        <NavLink
          to={userName ? '/profile' : '/login'}
          className={({ isActive }) =>
            clsx(styles.link, {
              [styles.link_active]: isActive
            })
          }
        >
          <ProfileIcon
            type={
              location.pathname === '/profile' || location.pathname === '/login'
                ? 'primary'
                : 'secondary'
            }
            className=''
          />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </div>
    </nav>
  </header>
);

//вынести класснейм в функцию, доработать
