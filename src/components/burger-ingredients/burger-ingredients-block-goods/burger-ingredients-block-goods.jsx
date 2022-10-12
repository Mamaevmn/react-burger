import classNames from 'classnames';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { goodsPropTypes } from '../../../utils/const';
import typesStyle from './burger-ingredients-block-goods.module.css';
import BurgerGoods from './burger-ingredients-goods/burger-ingredients-goods';

function BurgerIngredientsTypes(props) {
    return (
        <ul className={classNames(typesStyle.wrapper, 'mt-10')}>
            {props.blocks.map((block, idx) => 
                <li key={nanoid()}>
                    <p className="text text_type_main-medium mb-6">
                        {block.text}
                    </p>
                    <ul className={classNames(typesStyle.list, 'pb-6', 'pl-4', 'pr-4')}>
                        {props.data.map((goods, idx) => {
                            if (block.type === goods.type) return <BurgerGoods key={nanoid()} goods={goods}/>
                        })
                        }
                    </ul>
                </li>
            )}

        </ul>
    )
}

BurgerIngredientsTypes.propTypes = {
    data: PropTypes.arrayOf(goodsPropTypes),
}

export default BurgerIngredientsTypes