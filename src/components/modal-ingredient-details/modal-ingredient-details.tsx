import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useMediaQuery } from "react-responsive";

import styles from './modal-ingredient-details.module.css'
import {useSelector} from "../../services/hooks";
import { TFullIngredient } from '../../services/types/data';

function IngredientDetails() {
    const { id } = useParams<{ id?: string }>();
    const [ item, setItem ] = useState<TFullIngredient>()
    const { items, modalVisible } = useSelector(store => ({
        items: store.ingredients.items,
        modalVisible: store.modals.visible,
    }));
    const isMobile = useMediaQuery({
        query: "(max-width: 575px)"
    });
    
    useEffect(() => {
        setItem(items.find(item => id === item._id));
    }, [setItem, items, id])

    return (
        <div className={classNames(styles.modal_content, !modalVisible && styles.not_modal)}>
            <p className={classNames(styles.title, 'text', 'text_type_main-large')}>
                Детали ингредиента
            </p>
            
            <img className={styles.modal_content_img} src={!isMobile ? item?.image_large : item?.image} alt={item?.name}/>
            <p className={classNames(styles.name, 'text', 'text_type_main-medium', 'pt-4', 'pb-8')}>{item?.name}</p>
            <div className={styles.modal_content_compound}>
                <p className="text text_type_main-default text_color_inactive pr-5">
                    <span className={styles.digits_title}>Калории,ккал</span>
                    <span className={classNames(styles.digits, 'text', 'text_type_digits-default')}>{item?.calories}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive pr-5">
                    <span className={styles.digits_title}>Белки, г</span>
                    <span className={classNames(styles.digits, 'text', 'text_type_digits-default')}>{item?.proteins}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive pr-5">
                    <span className={styles.digits_title}>Жиры, г</span>
                    <span className={classNames(styles.digits, 'text', 'text_type_digits-default')}>{item?.fat}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    <span className={styles.digits_title}>Углеводы, г</span>
                    <span className={classNames(styles.digits, 'text', 'text_type_digits-default')}>{item?.carbohydrates}</span>
                </p>
            </div>
        </div>
    )
}

export default IngredientDetails