import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import styles from './profile.module.css';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileTabs from '../../components/profile-tabs/profile-tabs';
import { setUserData } from '../../services/actions/user';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

type TStore = {
    user: {
        name: string;
        email: string;
        password: string;
    };
}

function Profile() {
    const dispatch = useDispatch();
    const [fieldsIsChange, setFieldsIsChange] = useState(false);
    const name: any = useSelector<TStore>(store => store.user.name)
    const email: any = useSelector<TStore>(store => store.user.email)
    const password: any = useSelector<TStore>(store => store.user.password)

    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation({ name: name, email: email, password: password})

    useEffect(() => {
        if (name === values.name && email === values.email && password === values.password) {
            setFieldsIsChange(false)
        } else setFieldsIsChange(true)
    }, [values, name, email, password, fieldsIsChange])

    const submitNewUserData = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch<any>(setUserData(name, email, password))
    }, [dispatch, name, email, password])

    return (
        <section className={ classNames(styles.wrapper, 'container') } onSubmit={submitNewUserData}>
            <ProfileTabs />
            <form className={styles.inner}>
                <Input 
                    extraClass='mb-6'
                    name='name'
                    type='text' 
                    placeholder='Имя'
                    value={ values.name || '' }
                    error={ isValid === false }
                    errorText={ errors.name || '' }
                    onChange={() => handleChange}/> 
                <Input 
                    extraClass='mb-6' 
                    name='email'
                    type='email'
                    placeholder='Укажите e-mail' 
                    value={ values.email || '' } 
                    error={ isValid === false }
                    errorText={ errors.email || '' }
                    onChange={() => handleChange}
                    /> 
                <Input 
                    extraClass='mb-6'
                    name='password'
                    type='password' 
                    placeholder='Пароль'
                    value={ values.password || '' }
                    error={ isValid === false }
                    errorText={ errors.password || '' }
                    onChange={() => handleChange}/> 
                <div className={classNames(styles.buttons, !fieldsIsChange ? 'hidden' : '')}>
                    <button className={classNames(styles.btn_reset, 'mr-5', 'text', 'text_type_main-default', 'text_color_accent')}
                        type="reset"
                        onClick={() => resetForm({name, email, password})}>
                        Отмена
                    </button>
                    <Button
                        type="primary" 
                        htmlType="submit" >
                            Сохранить
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default Profile;