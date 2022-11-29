import { Link } from 'react-router-dom';

import linkStyle from './header-link.module.css';

import classNames from 'classnames';

function HeaderLink(props) {
    return (
        <Link className={classNames(linkStyle.link, props.classes)} to={props.link}>
            {props.children}
            <p className='text text_type_main-default ml-2'>
                {props.text}
            </p>
        </Link>
    )
}

export default HeaderLink