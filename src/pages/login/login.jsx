import { useCallback, useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './login.module.css';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { setLogin } from '../../services/actions/login';
import { getUser } from '../../services/actions/user';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Login() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [fieldsNotEmpty, setFiledsNotEmpty] = useState(false);
    const userAuth = useSelector(store => store.user.auth)
    const { values, handleChange, errors, isValid } = useFormAndValidation({ email: '', password: ''})

    useEffect(() => {
        if (values.email.length && values.password.length) {
            setFiledsNotEmpty(true);
        } else setFiledsNotEmpty(false);
    }, [fieldsNotEmpty, values])

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    const login = useCallback((e) => {
        e.preventDefault()
        dispatch(setLogin(values.email, values.password))
    }, [dispatch, values])

    if (!userAuth) {
        return (
            <form className={ styles.wrapper } onSubmit={(e) => login(e)}>
                <h2 className='text text_type_main-medium mb-6'>
                    Вход
                </h2>
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
                to={location?.state?.from || '/'}
            />
        );
    }
}

export default Login