import classNames from 'classnames';
import PropTypes from 'prop-types';
import { headerLinkPropTypes } from '../../../const';
import linkStyle from './header-link.module.css';

function HeaderLink(props) {
    return (
        <a className={classNames(linkStyle.link, props.classes)} href={props.link}>
            {props.children}
            <p className='text text_type_main-default ml-2'>
                {props.text}
            </p>
        </a>
    )
}

HeaderLink.propTypes = PropTypes.arrayOf(headerLinkPropTypes).isRequired

export default HeaderLink