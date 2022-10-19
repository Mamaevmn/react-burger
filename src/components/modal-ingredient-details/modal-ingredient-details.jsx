import { useSelector } from 'react-redux'

import modalContentStyle from './modal-ingredient-details.module.css'

function IngredientDetails() {
    const item = useSelector(store => store.modals.item);

    return (
        <div className={modalContentStyle.modal_content}>
            <img className={modalContentStyle.modal_content_img} src={item.image_large} alt={item.name}/>
            <p className="text text_type_main-medium pt-4 pb-8">{item.name}</p>
            <div className={modalContentStyle.modal_content_compound}>
                <p className="text text_type_main-default text_color_inactive pr-5">
                    <span>Калории,ккал</span>
                    <span className="text text_type_digits-default">{item.calories}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive pr-5">
                    <span>Белки, г</span>
                    <span className="text text_type_digits-default">{item.proteins}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive pr-5">
                    <span>Жиры, г</span>
                    <span className="text text_type_digits-default">{item.fat}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    <span>Углеводы, г</span>
                    <span className="text text_type_digits-default">{item.carbohydrates}</span>
                </p>
            </div>
        </div>
    )
}

export default IngredientDetails