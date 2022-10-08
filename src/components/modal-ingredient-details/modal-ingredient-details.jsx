import { goodsPropTypes } from '../../utils/const'
import modalContentStyle from './modal-ingredient-details.module.css'

function IngredientDetails(props) {
    return (
        <div className={modalContentStyle.modal_content}>
            <img className={modalContentStyle.modal_content_img} src={props.item.image_large} alt={props.item.name}/>
            <p className="text text_type_main-medium pt-4 pb-8">{props.item.name}</p>
            <div className={modalContentStyle.modal_content_compound}>
                <p className="text text_type_main-default text_color_inactive pr-5">
                    <span>Калории,ккал</span>
                    <span className="text text_type_digits-default">{props.item.calories}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive pr-5">
                    <span>Белки, г</span>
                    <span className="text text_type_digits-default">{props.item.proteins}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive pr-5">
                    <span>Жиры, г</span>
                    <span className="text text_type_digits-default">{props.item.fat}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    <span>Углеводы, г</span>
                    <span className="text text_type_digits-default">{props.item.carbohydrates}</span>
                </p>
            </div>
        </div>
    )
} 

IngredientDetails.propTypes = {
    item: goodsPropTypes,
}

export default IngredientDetails