import { useCallback } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import styles from './profile-tabs.module.css';
import classNames from 'classnames';

import { profileTabs } from "../../utils/const"
import { userLogout } from '../../services/actions/user';
import {useDispatch} from "../../services/hooks";
import { ILocation } from '../../services/types/data';

function ProfileTabs() {
    const history = useHistory();
    const location = useLocation<ILocation>();
    const dispatch = useDispatch();

    const logout = useCallback(
        () => {
            dispatch(userLogout(history.replace({
                pathname: '/login',
                state: {
                    from: location
                }
            })))
        },
        [history, dispatch, location]
    );

    return (
        <div className={classNames(styles.list, 'mr-15')}>
            <ul>
                {profileTabs.map((item, idx) => {
                    if (item.text.toLocaleLowerCase() === 'выход') {
                        return <li key={idx} className={styles.item}>
                            <button
                                className={classNames(styles.button, 'text text_type_main-medium', 'text_color_inactive')}
                                onClick={logout}>
                                {item.text}
                            </button>
                        </li>
                    } else {
                        return <li key={idx} className={styles.item}>
                            <Link className={classNames(
                                item.link.toLocaleLowerCase() === history.location.pathname.toLocaleLowerCase() ? 'text_color_primary' : 'text_color_inactive',
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
                <p key={idx} className={classNames(styles.opacity, 'text', 'text_type_main-default', 'text_color_inactive', 'mt-20')} dangerouslySetInnerHTML={{ __html: item.help }}>
                </p>
            )}
        </div>
    )
}

export default ProfileTabs