import { useSelector } from 'react-redux'

import modalContentStyle from './modal-ingredient-details.module.css'
import { ingredientPropTypes } from '../../utils/const';
import { useEffect } from 'react';

function IngredientDetails({_id, name, image_large, calories, proteins, fat, carbohydrates}) {
    let item = useSelector(store => store.modals.item);

    useEffect(() => {
        window.history.replaceState(null, null, `/ingredients/${_id ? _id : item._id}`)
    }, [_id, item])

    return (
        <div className={modalContentStyle.modal_content}>
            <img className={modalContentStyle.modal_content_img} src={image_large ? image_large : item.image_large} alt={name ? name : item.name}/>
            <p className="text text_type_main-medium pt-4 pb-8">{name ? name : item.name}</p>
            <div className={modalContentStyle.modal_content_compound}>
                <p className="text text_type_main-default text_color_inactive pr-5">
                    <span>Калории,ккал</span>
                    <span className="text text_type_digits-default">{calories ? calories : item.calories}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive pr-5">
                    <span>Белки, г</span>
                    <span className="text text_type_digits-default">{proteins ? proteins : item.proteins}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive pr-5">
                    <span>Жиры, г</span>
                    <span className="text text_type_digits-default">{fat ? fat : item.fat}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    <span>Углеводы, г</span>
                    <span className="text text_type_digits-default">{carbohydrates ? carbohydrates : item.carbohydrates}</span>
                </p>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = ingredientPropTypes;

export default IngredientDetails