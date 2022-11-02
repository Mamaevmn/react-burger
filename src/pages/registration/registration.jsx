import { useCallback, useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import styles from './registration.module.css';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { setUserRegistration } from '../../services/actions/registration';
import { getUser } from '../../services/actions/user';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Registration() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [fieldsNotEmpty, setFiledsNotEmpty] = useState(false);
    const { registrationSuccess, registrationFailed, authUser } = useSelector(store => ({
        registrationSuccess: store.registration.registrationSuccess,
        registrationFailed: store.registration.registrationFailed,
        authUser: store.user.auth
    }))
    const { values, handleChange, errors, isValid } = useFormAndValidation({ name: '', email: '', password: ''})

    useEffect(() => {
        if (values.name.length && values.email.length && values.password.length) {
            setFiledsNotEmpty(true);
        } else setFiledsNotEmpty(false);
    }, [fieldsNotEmpty, values])

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    const registration = useCallback((e) => {
        e.preventDefault()
        dispatch(setUserRegistration(values.name, values.email, values.password));
    }, [dispatch, values])

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
                { registrationFailed && 
                    <p className='test text_type_main-default text_color_error mt-1'>
                        Такой пользователь уже существует!
                    </p>
                }
                <Input 
                    extraClass='mb-6'
                    name='name'
                    type='text' 
                    placeholder='Имя'
                    value={ values.name || '' }
                    error={ isValid === false }
                    errorText={ errors.name || '' }
                    onChange={(e)=> handleChange(e)}/> 
                <Input 
                    extraClass='mb-6' 
                    name='email'
                    type='email'
                    placeholder='Укажите e-mail' 
                    value={ values.email || '' } 
                    error={ isValid === false }
                    errorText={ errors.email || '' }
                    onChange={(e)=> handleChange(e)}
                    /> 
                <Input 
                    extraClass='mb-6'
                    name='password'
                    type='password' 
                    placeholder='Пароль'
                    value={ values.password || '' }
                    error={ isValid === false }
                    errorText={ errors.password || '' }
                    onChange={(e)=> handleChange(e)}/> 
                <Button 
                    extraClass={ (!isValid || !fieldsNotEmpty) ? styles.btn_not_active : ''} 
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