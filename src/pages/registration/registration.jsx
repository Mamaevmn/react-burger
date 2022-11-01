import { useCallback, useEffect } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import styles from './registration.module.css';

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { 
    SET_REGISTRATION_EMAIL_VALUE, 
    SET_REGISTRATION_NAME_VALUE, 
    SET_REGISTRATION_PASSWORD_VALUE, 
    CLEAR_REGISTRATION_FIELDS, 
    setUserRegistration, 
} from '../../services/actions/registration';
import { getUser } from '../../services/actions/user';

function Registration() {
    const dispatch = useDispatch();
    const location = useLocation();

    const { name, email, password, emailIsValid, passwordIsValid, userIsExist, registrationSuccess, authUser } = useSelector(store => ({
        name: store.registration.name,
        email: store.registration.email,
        password: store.registration.password,
        emailIsValid: store.registration.emailIsValid,
        passwordIsValid: store.registration.passwordIsValid,
        userIsExist: store.registration.userIsExist,
        registrationSuccess: store.registration.registrationSuccess,
        authUser: store.user.auth
    }))

    useEffect(() => {
        dispatch({ type: CLEAR_REGISTRATION_FIELDS })
        dispatch(getUser());
    }, [dispatch])

    const registration = useCallback((e) => {
        e.preventDefault()
        dispatch(setUserRegistration(name, email, password));
    }, [dispatch, name, email, password])

    if (registrationSuccess) {
        return (
            <Redirect
                to={{
                    pathname: '/login'
                }}
            />
        );
    }

    if (!authUser) {
        return (
            <form className={ styles.wrapper } onSubmit={(e) => registration(e)}>
                <h2 className='text text_type_main-medium mb-6'>
                    Регистрация
                </h2>
                { userIsExist && 
                    <p className='test text_type_main-default text_color_error mt-1'>
                        Такой пользователь уже существует!
                    </p>
                }
                <Input 
                    extraClass='mb-6'
                    placeholder='Имя'
                    value={ name }
                    type='text' 
                    error={ userIsExist }
                    onChange={(e)=> dispatch({ type: SET_REGISTRATION_NAME_VALUE, payload: e.target.value })}/> 
                <EmailInput 
                    extraClass='mb-6' 
                    value={ email } 
                    error={ userIsExist }
                    onChange={(e)=> dispatch({ type: SET_REGISTRATION_EMAIL_VALUE, payload: e.target.value })}/> 
                <PasswordInput 
                    extraClass='mb-6' 
                    value={ password } 
                    error={ userIsExist }
                    onChange={(e)=> dispatch({ type: SET_REGISTRATION_PASSWORD_VALUE, payload: e.target.value })}/>
                <Button 
                    extraClass={ (!emailIsValid || !passwordIsValid) ? styles.btn_not_active : ''} 
                    type="primary" 
                    htmlType="submit" >
                    Зарегистрироваться
                </Button>
                <p className='text text_type_main-default text_color_inactive mt-20'>
                    Уже зарегистрированы?
                    <Link className='text text_color_accent ml-1' to='/login'>
                        Войти
                    </Link>
                </p>
            </form>
        )
    } else {
        return (
            <Redirect
                to={{
                    pathname: '/',
                    state: {
                        from: location
                    }
                }}
            />
        );
    }
}

export default Registration