import classNames from 'classnames';
import PropTypes from 'prop-types';
import { goodsPropTypes } from '../../const';
import mainStyle from './app-main.module.css';
import BurgerConstructor from './burger-constructor/burger-constructor';
import BurgerIngredients from './burger-ingredients/burger-ingredients';

function AppMain(props) {
    return (
        <main className={classNames(mainStyle.main, 'pt-10')}>
            <div className={classNames(mainStyle.main_container, 'container')}>
                <BurgerConstructor data={props.data}/>
                <BurgerIngredients data={props.data}/>
            </div>
        </main>
    )
}

AppMain.propTypes = {
    data: PropTypes.arrayOf(goodsPropTypes).isRequired
}

export default AppMain