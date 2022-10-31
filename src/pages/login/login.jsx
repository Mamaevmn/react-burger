import { useCallback, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './login.module.css';

import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { SET_EMAIL_VALUE, SET_PASSWORD_VALUE, CLEAR_LOGIN_FIELDS, setLogin } from '../../services/actions/login';
import { getUser } from '../../services/actions/user';

function Login() {
    const dispatch = useDispatch();

    const { email, password, emailIsValid, passwordIsValid, loginFailed, userAuth } = useSelector(store => ({
        email: store.login.email,
        password: store.login.password,
        emailIsValid: store.login.emailIsValid,
        passwordIsValid: store.login.passwordIsValid,
        loginFailed: store.login.loginFailed,
        userAuth: store.user.auth,
    }))

    useEffect(() => {
        dispatch({ type: CLEAR_LOGIN_FIELDS })
        dispatch(getUser());
    }, [dispatch])

    const login = useCallback((e) => {
        e.preventDefault()
        dispatch(setLogin(email, password))
    }, [dispatch, email, password])

    if (!userAuth) {
        return (
            <form className={ styles.wrapper }>
                <h2 className='text text_type_main-medium mb-6'>
                    Вход
                </h2>
                <EmailInput 
                    extraClass='mb-6' 
                    value={ email } 
                    error={ loginFailed }
                    onChange={(e)=> dispatch({ type: SET_EMAIL_VALUE, payload: e.target.value })}/> 
                <PasswordInput 
                    extraClass='mb-6' 
                    value={ password } 
                    error={ loginFailed }
                    onChange={(e)=> dispatch({ type: SET_PASSWORD_VALUE, payload: e.target.value })}/>
                <Button 
                    extraClass={ (!emailIsValid || !passwordIsValid) ? styles.btn_not_active : ''} 
                    type="primary" 
                    htmlType="submit" 
                    onClick={(e) => login(e)}>
                    Войти
                </Button>
                <p className='text text_type_main-default text_color_inactive mt-20'>
                    Вы — новый пользователь?
                    <Link 
                        className='text text_color_accent ml-1' 
                        to='/registration'>
                        Зарегистрироваться
                    </Link>
                </p>
                <p className='text text_type_main-default text_color_inactive mt-4'>
                    Забыли пароль?
                    <Link 
                        className='text text_color_accent ml-1' 
                        to='/recovery-password'>
                        Восстановить пароль
                    </Link>
                </p>
            </form>
        )
    } else {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }
}

export default Login