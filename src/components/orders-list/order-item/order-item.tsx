import styles from './order-item.module.css';
import classNames from "classnames";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from "react-router-dom";
import {OPEN_MODAL} from "../../../services/constants";
import {ORDER_INFO_TYPE, translateStatus} from "../../../utils/const";
import {useDispatch, useSelector} from "../../../services/hooks";
import { ILocation, TFullIngredient } from '../../../services/types/data';

function OrderItem({ ...props }) {
    const dispatch = useDispatch()
    const location = useLocation<ILocation>()

    const ingredients = useSelector(store => store.ingredients.items)

    const onOpenModal = () => dispatch({ type: OPEN_MODAL, payload: ORDER_INFO_TYPE})

    const findMatchIngredient = () => props.ingredients.map((id: string) => (id !== null) && ingredients.find((ingredient: TFullIngredient) => ingredient._id === id))

    return(
        <li onClick={onOpenModal} className={styles.wrapper}>
            <Link className={classNames(styles.item, 'p-6', 'text_color_primary')}
                to={{
                    pathname: `${location.pathname}/${props.number}`,
                    state: {
                        background: location
                    }
                }}
            >
                <span className={classNames(styles.date, 'text', 'text_type_main-default', 'text_color_inactive')}>
                    <FormattedDate date={new Date(props.createdAt)} />
                </span>
                <p className={classNames('text', 'text_type_digits-default', 'mb-6')}>
                    #{ props.number }
                </p>
                <h3 className={classNames(styles.title, 'text', 'text_type_main-medium', 'mb-2')}>
                    { props.name }
                </h3>
                <p className={classNames('text', 'text_type_main-default', 'mb-6', props.status === 'done' && 'text_color_success')}>
                    { translateStatus(props.status) }
                </p>
                <div className={styles.footer}>
                    <ul className={styles.ingredients}>
                        {
                            props.ingredients.length > 5 && 
                            findMatchIngredient().reverse().map((item: TFullIngredient, idx: number) => (idx === 5) && 
                                <li key={idx} className={styles.ingredient}>
                                    <span className={classNames(styles.ingredient_text, 'text', 'text_type_main-default')}>
                                        +{props.ingredients.length - 5}
                                    </span>
                                    <img className={styles.ingredient_image} src={item.image_mobile} alt={item.name} title={item.name} />
                                </li>
                            )
                        }
                        {
                            findMatchIngredient().reverse().map((item: TFullIngredient, idx: number) => {
                                if (idx < 5) {
                                    return <li key={idx} className={styles.ingredient}>
                                        <img className={styles.ingredient_image} src={item.image_mobile} alt={item.name} title={item.name} />
                                    </li>

                                } }
                            )
                        }
                    </ul>
                    <p className={classNames(styles.text, 'text', 'text_type_digits-default')}>
                        <span className='mr-2'>
                            { findMatchIngredient().reduce((accumulator: number, item: TFullIngredient) => accumulator + item.price, 0) }
                        </span>
                        <CurrencyIcon type="primary" />
                    </p>
                </div>
            </Link>
        </li>
    )
}

export  default  OrderItem;