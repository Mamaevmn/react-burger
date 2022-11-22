import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';

import styles from './recovery-password.module.css';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { setPasswordRecovery } from '../../services/actions/recovery-password';
import { useCallback, useEffect } from 'react';
import { getUser } from '../../services/actions/user';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

type TStore = {
    recovery: {recoveryPasswordSuccess: boolean}
    user: {auth: boolean},
}

function RecoveryPassword() {
    const dispatch = useDispatch();
    const location = useLocation();

    const recoveryPasswordSuccess: any = useSelector<TStore>(store => store.recovery.recoveryPasswordSuccess);
    const userAuth: any = useSelector<TStore>(store => store.user.auth);

    const {values, handleChange, errors, isValid} = useFormAndValidation({ email: ''})


    useEffect(() => {
        dispatch<any>(getUser());
    }, [dispatch])

    const resetPassword = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch<any>(setPasswordRecovery(values.email))
    },[values, dispatch]); 
    
    if (recoveryPasswordSuccess) {
        return (
            <Redirect
                to={{
                    pathname: '/reset-password'
                }}
            />
        );
    }

    if (!userAuth) {
        return (
            <form className={ styles.wrapper } onSubmit={resetPassword}>
                <h2 className='text text_type_main-medium mb-6'>
                    Восстановление пароля
                </h2>
                <Input 
                    extraClass='mb-6' 
                    name='email'
                    type='email'
                    placeholder='Укажите e-mail' 
                    error={ isValid === false }
                    errorText={ errors.email || '' }
                    value={ values.email || '' } 
                    onChange={(e)=> handleChange(e)}
                    /> 
                <Button 
                    extraClass={ !isValid ? styles.btn_not_active : ''} 
                    type="primary" 
                    htmlType="submit" >
                    Восстановить
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
                        from: location,
                    }
                }}
            />
        );
    }
}

export default RecoveryPassword