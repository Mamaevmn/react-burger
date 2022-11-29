import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import classNames from 'classnames';

import modalContentStyle from './modal-ingredient-details.module.css'

function IngredientDetails() {
    const { id } = useParams();
    const [ item, setItem ] = useState({})
    const { items, title } = useSelector(store => ({
        items: store.ingredients.items,
        title: store.modals.title,
    }));

    useEffect(() => {
        setItem(items.find(item => id === item._id))
    }, [setItem, items, id])

    return (
        <div className={modalContentStyle.modal_content}>
            {title && <p className={classNames(modalContentStyle.title, 'text', 'text_type_main-large')}>{title}</p>}
            <img className={modalContentStyle.modal_content_img} src={item?.image_large} alt={item?.name}/>
            <p className="text text_type_main-medium pt-4 pb-8">{item?.name}</p>
            <div className={modalContentStyle.modal_content_compound}>
                <p className="text text_type_main-default text_color_inactive pr-5">
                    <span>Калории,ккал</span>
                    <span className="text text_type_digits-default">{item?.calories}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive pr-5">
                    <span>Белки, г</span>
                    <span className="text text_type_digits-default">{item?.proteins}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive pr-5">
                    <span>Жиры, г</span>
                    <span className="text text_type_digits-default">{item?.fat}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    <span>Углеводы, г</span>
                    <span className="text text_type_digits-default">{item?.carbohydrates}</span>
                </p>
            </div>
        </div>
    )
}

export default IngredientDetails