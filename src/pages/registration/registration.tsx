import { useCallback, useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";

import styles from './registration.module.css';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { setUserRegistration } from '../../services/actions/registration';
import { getUser } from '../../services/actions/user';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import {useDispatch, useSelector} from "../../services/hooks";
import classNames from 'classnames';
import { ILocation } from '../../services/types/data';

function Registration() {
    const dispatch = useDispatch();
    const location = useLocation<ILocation>();
    const [fieldsNotEmpty, setFiledsNotEmpty] = useState(false);
    const {registrationSuccess, registrationFailed, userAuth} = useSelector(store => ({
        registrationSuccess: store.registration.registrationSuccess,
        registrationFailed: store.registration.registrationFailed,
        userAuth: store.user.auth
    }));
    const isMobile = useMediaQuery({
        query: "(max-width: 575px)"
    });

    const { values, handleChange, errors, isValid } = useFormAndValidation({ name: '', email: '', password: ''})

    useEffect(() => {
        if (values.name.length && values.email.length && values.password.length) {
            setFiledsNotEmpty(true);
        } else setFiledsNotEmpty(false);
    }, [fieldsNotEmpty, values])

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    const registration = useCallback((e: React.FormEvent<HTMLFormElement>) => {
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

    if (!userAuth) {
        return (
            <form className={ styles.wrapper } onSubmit={registration}>
                <h2 className='text text_type_main-medium mb-6'>
                    Регистрация
                </h2>
                { registrationFailed && 
                    <p className='test text_type_main-default text_color_error mt-1'>
                        Такой пользователь уже существует!
                    </p>
                }
                <Input 
                    extraClass={classNames(isMobile && styles.input, isMobile ? 'mb-5' : 'mb-6')}
                    name='name'
                    type='text' 
                    placeholder='Имя'
                    value={ values.name || '' }
                    error={ isValid === false }
                    errorText={ errors.name || '' }
                    onChange={(e)=> handleChange(e)}/> 
                <Input 
                    extraClass={classNames(isMobile && styles.input, isMobile ? 'mb-5' : 'mb-6')}
                    name='email'
                    type='email'
                    placeholder='Укажите e-mail' 
                    value={ values.email || '' } 
                    error={ isValid === false }
                    errorText={ errors.email || '' }
                    onChange={(e)=> handleChange(e)}
                    /> 
                <Input 
                    extraClass={classNames(isMobile && styles.input, isMobile ? 'mb-5' : 'mb-6')}
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
                <p className={classNames(isMobile && styles.text, 'text', isMobile ? 'text_type_main-small' : 'text_type_main-default', 'text_color_inactive', isMobile? 'mt-10' : 'mt-20')}>
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