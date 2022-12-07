import { Link, useLocation } from 'react-router-dom';

import classNames from 'classnames';
import styles from './header.module.css';

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from "../../services/hooks";

import mobile_logo from './../../images/logo/logo--mobile.svg'
import MediaQuery from "react-responsive";
import { ILocation } from '../../services/types/data';

function Header() {
    const location = useLocation<ILocation>()
    const {userAuth, name} = useSelector(store => ({
        userAuth: store.user.auth,
        name: store.user.name
    }))

    return (
        <header className={classNames(styles.header)}>
            <div className={classNames(styles.container, 'container', 'pt-4', 'pb-4')}>
                <nav className={styles.nav}>
                <Link className={classNames(styles.link, location.pathname === '/' ? 'color-text--primary' : 'text_color_inactive', 'mr-2', 'pr-5', 'pt-4', 'pb-4')} to='/' title='Конструктор'>
                    <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
                    <p className='text text_type_main-default ml-2'>
                        Конструктор
                    </p>
                </Link>
                <Link className={classNames(styles.link, location.pathname === '/feed' ? 'color-text--primary' : 'text_color_inactive', 'pr-5', 'pl-5', 'pt-4', 'pb-4')} to='/feed' title='Лента заказов'>
                    <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
                    <p className='text text_type_main-default ml-2'>
                        Лента заказов
                    </p>
                </Link>
                <Link className={classNames(styles.link, location.pathname === '/profile' ? 'color-text--primary' : 'text_color_inactive', 'pr-5', 'pl-5', 'pt-4', 'pb-4', 'ml-a')} to='/profile' title='Личный кабинет'>
                    <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'} />
                    <p className='text text_type_main-default ml-2'>
                        {!userAuth ? 'Личный кабинет' : name}
                    </p>
                </Link>
                </nav>
                <Link className={styles.logo} to="/">
                    <MediaQuery minWidth={1024} >
                        <Logo />
                    </MediaQuery>
                    <MediaQuery maxWidth={1023} >
                        <img src={mobile_logo} alt='Stellar Burger' title='Stellar Burger'/>
                    </MediaQuery>
                </Link>
                <MediaQuery maxWidth={767} >
                    <button className={styles.burger_btn}>
                        <span></span>
                    </button>
                </MediaQuery>
            </div>
        </header>
    )
}

export default Header