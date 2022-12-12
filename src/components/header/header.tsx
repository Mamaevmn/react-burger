import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MediaQuery from "react-responsive";

import classNames from 'classnames';
import styles from './header.module.css';

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from "../../services/hooks";

import mobile_logo from './../../images/logo/logo--mobile.svg'
import { ILocation } from '../../services/types/data';

function Header() {
    const location = useLocation<ILocation>()
    const {userAuth, name} = useSelector(store => ({
        userAuth: store.user.auth,
        name: store.user.name
    }))
    const [ menuIsOpen, setMenuIsOpen ] = useState<boolean>(false)

    const toggleMenu = () => {setMenuIsOpen(!menuIsOpen)}
    const closeMenu = () => {setMenuIsOpen(false)}

    return (
        <header className={classNames(styles.header, menuIsOpen && styles.menuIsOpen)}>
            <div className={classNames(styles.container, 'container', 'pt-4', 'pb-4')}>
                <nav className={styles.nav}>
                    <Link className={classNames(styles.link, location.pathname === '/' ? 'color-text--primary' : 'text_color_inactive', 'mr-2', 'pr-5', 'pt-4', 'pb-4')} to='/' title='Конструктор' onClick={closeMenu}>
                        <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
                        <p className='text text_type_main-default ml-2'>
                            Конструктор
                        </p>
                    </Link>
                    <Link className={classNames(styles.link, location.pathname.includes('/feed') ? 'color-text--primary' : 'text_color_inactive', 'pr-5', 'pl-5', 'pt-4', 'pb-4')} to='/feed' title='Лента заказов' onClick={closeMenu}>
                        <ListIcon type={location.pathname.includes('/feed') ? 'primary' : 'secondary'} />
                        <p className='text text_type_main-default ml-2'>
                            Лента заказов
                        </p>
                    </Link>
                    <Link className={classNames(styles.link, location.pathname.includes('/profile') ? 'color-text--primary' : 'text_color_inactive', 'pr-5', 'pl-5', 'pt-4', 'pb-4', 'ml-a')} to='/profile' title='Личный кабинет'>
                        <ProfileIcon type={location.pathname.includes('/profile') ? 'primary' : 'secondary'} />
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
                    <button className={classNames(styles.burger_btn)} onClick={toggleMenu}>
                        <span></span>
                    </button>
                </MediaQuery>
            </div>
        </header>
    )
}

export default Header