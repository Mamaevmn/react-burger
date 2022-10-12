import classNames from 'classnames';
import headerStyle from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLink from './header-link/header-link';
import { headerLinks } from '../../utils/const';
import { nanoid } from 'nanoid';

function AppHeader() {
    return (
        <header className={classNames(headerStyle.header)}>
            <div className={classNames(headerStyle.container, 'container', 'pt-4', 'pb-4')}>
                <nav className={headerStyle.header_nav}>
                    {headerLinks.map((curr_link, idx) => 
                        <HeaderLink key={nanoid()} text={curr_link.text} link={curr_link.link} classes={curr_link.classes}>
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