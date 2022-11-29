import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import styles from './profile-tabs.module.css';
import classNames from 'classnames';

import { profileTabs } from "../../utils/const"
import { CLEAR_USER_DATA } from '../../services/constants';
import { userLogout } from '../../services/actions/user';

function ProfileTabs() {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const logout = useCallback(
        () => {
            dispatch(userLogout())
            dispatch({ type: CLEAR_USER_DATA })
            history.replace({ pathname: '/login' });
        },
        [history, dispatch]
    );

    return (
        <div className={classNames(styles.list, 'mr-15')}>
            <ul>
                {profileTabs.map((item, idx) => {
                    if (item.text.toLocaleLowerCase() === 'выход') {
                        return <li key={idx} className={styles.item}>
                            <button 
                                className={classNames(styles.button, 'text text_type_main-medium', 'text_color_primary')}
                                onClick={logout}>
                                {item.text}
                            </button>
                        </li>
                    } else {
                        return <li key={idx} className={styles.item}>
                            <Link className={classNames(
                                item.link.toLocaleLowerCase() === history.location.pathname.toLocaleLowerCase() ? 'text_color_inactive' : 'text_color_primary',
                                    'text text_type_main-medium'
                                )} 
                                to={item.link} >
                                {item.text}
                            </Link>
                        </li>
                    }
                }
                )}
            </ul>
            {profileTabs.map((item, idx) => 
                item.link.toLocaleLowerCase() === history.location.pathname.toLocaleLowerCase() && 
                item.help &&
                <p key={idx} className={classNames(styles.opacity, 'text', 'text_type_main-default', 'text_color_inactive', 'mt-20')} dangerouslySetInnerHTML={{__html: item.help}}>
                </p>
            )}
        </div>
    )
}

export default ProfileTabs