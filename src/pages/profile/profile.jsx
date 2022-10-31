import { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import styles from './profile.module.css';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileTabs from '../../components/profile-tabs/profile-tabs';
import { CLEAR_USER_CHANGING, setUserData, SET_USER_EMAIL_VALUE, SET_USER_NAME_VALUE, SET_USER_PASSWORD_VALUE } from '../../services/actions/user';

function Profile() {
    const dispatch = useDispatch();
    const { name, email, password, userAuth } = useSelector(store => ({
        name: store.user.name,
        email: store.user.email,
        password: store.user.password,
        userAuth: store.user.auth,
    }))

    const [ currentName, setCurrentName] = useState(name);
    const [ currentEmail, setCurrentEmail] = useState(email);
    const [ currentPassword, setCurrentPassword] = useState(password);
    const [ fieldsIsChange, setFieldsIsChange] = useState(false);

    useEffect(() => {
        (name === currentName && email === currentEmail && password === currentPassword) ?
            setFieldsIsChange(false) :
            setFieldsIsChange(true)
    }, [name, email, password, currentName, currentEmail, currentPassword])

    const submitNewUserData = useCallback((e) => {
        e.preventDefault()
        dispatch(setUserData(name, email, password))
    }, [dispatch, name, email, password])

    const resetFields = useCallback(() => {
        setCurrentName(name)
        setCurrentEmail(email)
        setCurrentPassword(password)
        dispatch({type: CLEAR_USER_CHANGING})
    }, [dispatch, name, email, password])

    if (userAuth) {
        return (
            <section className={ classNames(styles.wrapper, 'container') }>
                <ProfileTabs />
                <form className={styles.inner}>
                    <Input 
                        extraClass='text_color_inactive mb-6' 
                        type='text' 
                        placeholder='Имя'
                        value={currentName} 
                        icon='EditIcon' 
                        onChange={(e)=> setCurrentName(e.target.value)}/>
                    <Input 
                        extraClass='text_color_inactive mb-6' 
                        type='email' 
                        placeholder='Логин' 
                        value={email}
                        icon='EditIcon' 
                        onChange={(e)=> dispatch({ type: SET_USER_EMAIL_VALUE, payload: e.target.value })}/>
                    <Input 
                        extraClass='text_color_inactive mb-6' 
                        type='password' 
                        placeholder='Пароль' 
                        value={password} 
                        icon='EditIcon' 
                        onChange={(e)=> dispatch({ type: SET_USER_PASSWORD_VALUE, payload: e.target.value })}/>
                    <div className={classNames(styles.buttons, !fieldsIsChange ? 'hidden' : '')}>
                        <button className={classNames(styles.btn_reset, 'mr-5', 'text', 'text_type_main-default', 'text_color_accent')}
                            type="reset"
                            onClick={() => resetFields()}>
                            Отмена
                        </button>
                        <Button
                            type="primary" 
                            htmlType="submit" 
                            onClick={(e) => submitNewUserData(e)}
                            >
                                Сохранить
                        </Button>
                    </div>
                </form>
            </section>
        )
    } else {
        return (
            <Redirect
                to={{
                    pathname: '/login'
                }}
            />
        );
    }
}

export default Profile;