import { Link } from 'react-router-dom';

import linkStyle from './header-link.module.css';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { headerLinkPropTypes } from '../../../utils/const';

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

HeaderLink.propTypes = PropTypes.arrayOf(headerLinkPropTypes).isRequired

export default HeaderLink