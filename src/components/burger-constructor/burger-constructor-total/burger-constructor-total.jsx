import classNames from 'classnames';
import totalStyle from './burger-constructor-total.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useContext, useEffect, useState, useReducer } from 'react';
import Modal from '../../modal/modal';
import { ConstructorDataContext } from '../../../contexts/constructorDataContext';
import { postOrder } from '../../../utils/api';
import OrderDetails from '../../modal-order-details/modal-order-details';

const initialTotalPriceState = { total: 0 };

function totalReducer(totalPriceState, action) {
    switch (action.type) {
        case "sum":
            return { total: totalPriceState.total + action.payload };
        case "reset":
            return { total: 0 };
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

function BurgerConstructorTotal() {
    const { constructorData } = useContext(ConstructorDataContext);
    const [ visibleModal, setVisibleModal ] = useState(false);
    const [ totalPriceState, totalPriceDispatch ] = useReducer(totalReducer, initialTotalPriceState);
    const [ numberOrder, setNumberOrder ] = useState(0);
    const [ fetchState, setFetchState ] = useState({ 
        hasError: false,
        loading: true,
      }
    )

    useEffect(() => {
        totalPriceDispatch({type: 'reset'})

        if (constructorData.length) {
            calculateTotalPrice();
        }
    }, [constructorData])

    function calculateTotalPrice() {
        constructorData.map(goods => totalPriceDispatch({ type: 'sum', payload: goods.price }))
    }

    function createGoodsIdArray() {
        let idArray = [];
        constructorData.map(goods => idArray.push(goods._id));

        return idArray;
    }

    const makeOrder = () => {
        const orderIdArray = createGoodsIdArray();

        setFetchState({hasError: false, loading: true });
        postOrder(orderIdArray)
            .then(message => {
                if (message.success) {
                    setNumberOrder(message.order.number)
                    setFetchState({ ...fetchState, loading: false })
                    setVisibleModal(true)
                } else setFetchState({ hasError: true, loading: false });
            })
    }

    const onCloseModal = () => {
        setVisibleModal(false)
    }

    return (
        <>
            <div className={classNames(totalStyle.total, 'pt-10')}>
                <p className={classNames(totalStyle.text, 'text', 'text_type_digits-medium', 'pr-10')}>
                    <span className='mr-2'>
                        {totalPriceState.total}
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
                <Button type="primary" size="large" htmlType="button" onClick={makeOrder}>
                    Оформить заказ
                </Button>
            </div>
            {visibleModal && 
                <Modal
                    closeModal={onCloseModal}
                >
                    <OrderDetails 
                        numberOrder={numberOrder}
                        hasError={fetchState.hasError}
                        loading={fetchState.loading}
                    />
                </Modal>
            }
        </>
    )
}

export default BurgerConstructorTotal