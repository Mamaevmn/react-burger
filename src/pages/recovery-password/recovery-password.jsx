import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import styles from './recovery-password.module.css';

import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { CLEAR_EMAIL_VALUE, setPasswordRecovery, SET_RECOVERY_EMAIL_VALUE } from '../../services/actions/recovery-password';
import { useCallback, useEffect } from 'react';
import { getUser } from '../../services/actions/user';

function RecoveryPassword() {
    const dispatch = useDispatch();

    const { email, emailIsValid, recoveryPasswordSuccess, userAuth } = useSelector(store => ({
        email: store.recovery.email,
        emailIsValid: store.recovery.emailIsValid,
        recoveryPasswordSuccess: store.recovery.recoveryPasswordSuccess,
        userAuth: store.user.auth
    }));

    useEffect(() => {
        dispatch({ type: CLEAR_EMAIL_VALUE })
        dispatch(getUser());
    }, [dispatch])

    const resetPassword = useCallback((e) => {
        e.preventDefault()
        dispatch(setPasswordRecovery(email))
    },[email, dispatch]); 
    
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
            <form className={ styles.wrapper }>
                <h2 className='text text_type_main-medium mb-6'>
                    Восстановление пароля
                </h2>
                <EmailInput 
                    extraClass='mb-6' 
                    placeholder='Укажите e-mail' 
                    value={ email } 
                    onChange={(e)=> dispatch({ type: SET_RECOVERY_EMAIL_VALUE, payload: e.target.value})}/> 
                <Button 
                    extraClass={ !emailIsValid ? styles.btn_not_active : ''} 
                    type="primary" 
                    htmlType="submit" 
                    onClick={() => resetPassword()}>
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
                    pathname: '/'
                }}
            />
        );
    }
}

export default RecoveryPassword