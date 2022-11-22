import { useCallback, useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './reset-password.module.css';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser } from '../../services/actions/user';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

type TStore = {
    recovery: {recoveryPasswordSuccess: boolean}
    user: {auth: boolean},
}

function ResetPassword() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [fieldsNotEmpty, setFiledsNotEmpty] = useState(false);

    const recoveryPasswordSuccess: any = useSelector<TStore>(store => store.recovery.recoveryPasswordSuccess);
    const userAuth: any = useSelector<TStore>(store => store.user.auth);

    const { values, handleChange, errors, isValid } = useFormAndValidation({ code: '', password: ''})

    useEffect(() => {
        if (values.code.length && values.password.length) {
            setFiledsNotEmpty(true);
        } else setFiledsNotEmpty(false);
    }, [fieldsNotEmpty, values])

    useEffect(() => {
        dispatch<any>(getUser());
    }, [dispatch])

    const submitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('password is reset');
    }, [])

    if (!userAuth && recoveryPasswordSuccess) {
        return (
            <form className={ styles.wrapper } onSubmit={submitForm}>
                <h2 className='text text_type_main-medium mb-6'>
                    Восстановление пароля
                </h2>
                <Input 
                    extraClass='mb-6'
                    name='password'
                    type='password' 
                    placeholder='Пароль'
                    value={ values.password || '' }
                    error={ isValid === false }
                    errorText={ errors.password || '' }
                    onChange={(e)=> handleChange(e)}/> 
                <Input 
                    extraClass='mb-6'
                    name='code'
                    type='text' 
                    placeholder='Введите код из письма'
                    value={ values.code || '' }
                    error={ isValid === false }
                    errorText={ errors.code || '' }
                    onChange={(e)=> handleChange(e)}/> 
                <Button 
                    extraClass={ (!isValid || !fieldsNotEmpty) ? styles.btn_not_active : ''} 
                    type="primary" 
                    htmlType="submit">
                    Сохранить
                </Button>
                <p className='text text_type_main-default text_color_inactive mt-20'>
                    Вспомнили пароль?
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

export default ResetPassword