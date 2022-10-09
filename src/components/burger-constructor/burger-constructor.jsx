import classNames from 'classnames';
import PropTypes from 'prop-types';
import constructorStyle from './burger-constructor.module.css';
import Tabs from './burger-constructor-types/burger-constructor-types';
import BurgerConstructorTypes from './burger-constructor-block-goods/burger-constructor-block-goods';
import { blocks, goodsPropTypes } from '../../utils/const';

function BurgerConstructor(props) {
    return (
        <section className={classNames(constructorStyle.section)}>
            <h1 className="text text_type_main-large mb-5">
                Соберите бургер
            </h1>
            <Tabs tabs={blocks}/>
            <BurgerConstructorTypes data={props.data} blocks={blocks}/>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(goodsPropTypes),
}

export default BurgerConstructor