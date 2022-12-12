import { useCallback, useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";

import styles from './reset-password.module.css';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser } from '../../services/actions/user';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import {useDispatch, useSelector} from "../../services/hooks";
import classNames from 'classnames';
import { ILocation } from '../../services/types/data';

function ResetPassword() {
    const dispatch = useDispatch();
    const location = useLocation<ILocation>();
    const [fieldsNotEmpty, setFiledsNotEmpty] = useState<boolean>(false);
    const {recoveryPasswordSuccess, userAuth} = useSelector(store => ({
        recoveryPasswordSuccess: store.recovery.recoveryPasswordSuccess,
        userAuth: store.user.auth
    }));
    const isMobile = useMediaQuery({
        query: "(max-width: 575px)"
    });

    const { values, handleChange, errors, isValid } = useFormAndValidation({ code: '', password: ''})

    useEffect(() => {
        if (values.code.length && values.password.length) {
            setFiledsNotEmpty(true);
        } else setFiledsNotEmpty(false);
    }, [fieldsNotEmpty, values])

    useEffect(() => {
        dispatch(getUser());
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
                    extraClass={classNames(isMobile && styles.input, isMobile ? 'mb-5' : 'mb-6')}
                    name='password'
                    type='password' 
                    placeholder='Пароль'
                    value={ values.password || '' }
                    error={ isValid === false }
                    errorText={ errors.password || '' }
                    onChange={(e)=> handleChange(e)}/> 
                <Input 
                    extraClass={classNames(isMobile && styles.input, isMobile ? 'mb-5' : 'mb-6')}
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
                <p className={classNames(isMobile && styles.text, 'text', isMobile ? 'text_type_main-small' : 'text_type_main-default', 'text_color_inactive', isMobile? 'mt-10' : 'mt-20')}>
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