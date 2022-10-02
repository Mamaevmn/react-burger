import PropTypes from 'prop-types';
import ingredientsStyle from './burger-ingredients-list.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import touchSvg from './../../../images/icons/touch-btn.svg'
import { goodsPropTypes } from '../../../utils/const';

function BurgerIngredientsList(props) {
    return (
        <div className='pl-8' style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ConstructorElement 
                key={0}
                type="top"
                isLocked={true}
                text={`${props.data[0].name} (верх)`}
                price={props.data[0].price}
                thumbnail={props.data[0].image_mobile}
            />
            {
                props.data.length > 2 ?
                    <ul className='scroll-block scroll-block--medium' style={{marginLeft: '-32px', paddingLeft: '32px'}}>
                        {props.data.map((goods, idx) => {
                            if (idx !== 0 && idx < (props.data.length - 1)) {
                                return <li key={idx} className={ingredientsStyle.constructor_element}>
                                        <button className={ingredientsStyle.touch_btn}>
                                            <img src={touchSvg} alt="touch-icon" />
                                        </button>
                                        <ConstructorElement key={idx}
                                            text={goods.name}
                                            price={goods.price}
                                            thumbnail={goods.image_mobile}
                                        />
                                    </li>
                            }
                        })}
                    </ul> : null
            }
            <ConstructorElement 
                key={props.data.length - 1}
                type="bottom"
                isLocked={true}
                text={`${props.data[props.data.length - 1].name} (низ)`}
                price={props.data[props.data.length - 1].price}
                thumbnail={props.data[props.data.length - 1].image_mobile}
            />
        </div>
    )
}

BurgerIngredientsList.propTypes = {
    data: PropTypes.arrayOf(goodsPropTypes),
}

export default BurgerIngredientsList