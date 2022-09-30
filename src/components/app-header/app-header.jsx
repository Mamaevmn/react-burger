import classNames from 'classnames';
import headerStyle from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLink from './header-link/header-link';

function AppHeader(props) {
    const headerLinks = [
        {   
            classes: ['color-text--primary', 'mr-2', 'pr-5', 'pl-5', 'pt-4', 'pb-4'],
            link: 23,
            icon: <BurgerIcon type="primary" />,
            text: 'Конструктор'
        },
        {   
            classes: ['color-text--secondary', 'pr-5', 'pl-5', 'pt-4', 'pb-4'],
            link: '/',
            icon: <ListIcon type="secondary" />,
            text: 'Лента заказов'
        },
        {   
            classes: ['color-text--secondary', 'pr-5', 'pl-5', 'pt-4', 'pb-4', 'ml-a'],
            link: '/',
            icon: <ProfileIcon type="secondary" />,
            text: 'Личный кабинет'
        },
    ];

    return (
        <header className={classNames(headerStyle.header)}>
            <div className={classNames(headerStyle.container, 'container', 'pt-4', 'pb-4')}>
                <nav className={headerStyle.header_nav}>
                    {headerLinks.map((curr_link, idx) => 
                        <HeaderLink key={idx} text={curr_link.text} link={curr_link.link} classes={curr_link.classes}>
                            {curr_link.icon}
                        </HeaderLink>
                    )}
                </nav>
                <a className={headerStyle.header_logo} href="/">
                    <Logo />
                </a>
            </div>
        </header>
    )
}

export default AppHeader