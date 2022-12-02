import { Link } from 'react-router-dom';

import classNames from 'classnames';
import headerStyle from './header.module.css';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLink from './header-link/header-link';
import { headerLinks } from '../../utils/const';
import { THeaderLinks } from '../../utils/types';
import {useSelector} from "../../services/hooks";

function Header() {
    const {userAuth, name} = useSelector(store => ({
        userAuth: store.user.auth,
        name: store.user.name
    }))

    return (
        <header className={classNames(headerStyle.header)}>
            <div className={classNames(headerStyle.container, 'container', 'pt-4', 'pb-4')}>
                <nav className={headerStyle.nav}>
                    {headerLinks.map((curr_link: THeaderLinks, idx: number) => {
                        const link: string = curr_link.link !== '/login' ? curr_link.link : userAuth ? '/profile' : curr_link.link;
                        const linkText: any = curr_link.text !== 'Личный кабинет' ? curr_link.text : userAuth ? name : curr_link.text;

                        return <HeaderLink key={idx} text={linkText} link={link} classes={curr_link.classes} icon={curr_link.icon}/>
                    })}
                </nav>
                <Link className={headerStyle.logo} to="/">
                    <Logo />
                </Link>
            </div>
        </header>
    )
}

export default Header