import PropTypes from 'prop-types';
import ingredientsStyle from './burger-ingredients-list.module.css'
import touchSvg from './../../../images/icons/touch-btn.svg'
import { goodsPropTypes } from '../../../utils/const';
import { useRef } from 'react';
import BurgerIngredientsListItem from './burger-ingredients-list-item/burger-ingredients-list-item';

function BurgerIngredientsList(props) {
    const itemRef = useRef();

    return (
        <div className='pl-8' style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <BurgerIngredientsListItem 
                key="0"
                isLocked={true}
                text={`${props.data[0].name} (верх)`}
                {...props.data[0]}
            />
            {
                props.data.length > 2 ?
                    <ul className='scroll-block scroll-block--medium' style={{marginLeft: '-32px', paddingLeft: '32px'}}>
                        {props.data.map((goods, idx) => {
                            if (idx > 1) {
                                return <li key={idx} className={ingredientsStyle.constructor_element} ref={itemRef}>
                                        <button className={ingredientsStyle.touch_btn}>
                                            <img src={touchSvg} alt="touch-icon" />
                                        </button>
                                        <BurgerIngredientsListItem 
                                            key={idx}
                                            {...goods}
                                        />
                                    </li>
                            }
                        })}
                    </ul> : null
            }
            <BurgerIngredientsListItem 
                key={props.data[1]}
                isLocked={true}
                text={`${props.data[1].name} (низ)`}
                {...props.data[1]}
            />
        </div>
    )
}

BurgerIngredientsList.propTypes = {
    data: PropTypes.arrayOf(goodsPropTypes),
}

export default BurgerIngredientsList