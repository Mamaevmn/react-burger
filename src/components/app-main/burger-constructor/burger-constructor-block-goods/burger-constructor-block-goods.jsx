import classNames from 'classnames';
import PropTypes from 'prop-types';
import { goodsPropTypes } from '../../../../const';
import typesStyle from './burger-constructor-block-goods.module.css';
import BurgerGoods from './burger-constructor-goods/burger-constructor-goods';

function BurgerConstructorTypes(props) {
    return (
        <ul className={classNames('scroll-block', 'scroll-block--big', 'mt-10')}>
            {props.blocks.map((block, idx) => 
                <li key={idx}>
                    <p className="text text_type_main-medium mb-6">
                        {block.text}
                    </p>
                    <ul className={classNames(typesStyle.goods_list, 'pb-6', 'pl-4', 'pr-4')}>
                        {props.data.map((goods, idx) => {
                            if (block.type === goods.type) return <BurgerGoods key={idx} goods={goods}/>
                        })
                        }
                    </ul>
                </li>
            )}

        </ul>
    )
}

BurgerConstructorTypes.propTypes = {
    data: PropTypes.arrayOf(goodsPropTypes),
}

export default BurgerConstructorTypes