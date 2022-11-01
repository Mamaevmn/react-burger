import { useCallback, useEffect } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './reset-password.module.css';

import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { CLEAR_RESET_PASSWORD_FIELDS, SET_CODE_VALUE, SET_RESET_PASSWORD_VALUE } from '../../services/actions/reset-password';
import { getUser } from '../../services/actions/user';

function ResetPassword() {
    const dispatch = useDispatch();
    const location = useLocation();

    const { code, password, codeIsValid, passwordIsValid, authUser, recoveryPasswordSuccess } = useSelector(store => ({
        password: store.resetPassword.password,
        code: store.resetPassword.code,
        passwordIsValid: store.resetPassword.passwordIsValid,
        codeIsValid: store.resetPassword.codeIsValid,
        authUser: store.user.auth,
        recoveryPasswordSuccess: store.recovery.recoveryPasswordSuccess,
    }))

    useEffect(() => {
        dispatch({ type: CLEAR_RESET_PASSWORD_FIELDS })
        dispatch(getUser());
    }, [dispatch])

    const submitForm = useCallback((e) => {
        e.preventDefault();
        console.log('password is reset');
    }, [])

    if (!authUser && recoveryPasswordSuccess) {
        return (
            <form className={ styles.wrapper } onSubmit={(e) => submitForm(e)}>
                <h2 className='text text_type_main-medium mb-6'>
                    Восстановление пароля
                </h2>
                <PasswordInput 
                    extraClass='mb-6' 
                    placeholder='Введите новый пароль'
                    value={ password } 
                    onChange={(e)=> dispatch({ type: SET_RESET_PASSWORD_VALUE, payload: e.target.value })}/> 
                <Input 
                    extraClass='mb-6' 
                    placeholder='Введите код из письма' 
                    type='text' 
                    value={ code } 
                    onChange={(e)=> dispatch({ type: SET_CODE_VALUE, payload: e.target.value })}/> 
                <Button 
                    extraClass={ (!passwordIsValid || !codeIsValid) ? styles.btn_not_active : ''} 
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