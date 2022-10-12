import classNames from 'classnames';
import totalStyle from './burger-constructor-total.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useContext, useEffect, useState, useReducer } from 'react';
import Modal from '../../modal/modal';
import { ConstructorDataContext } from '../../../utils/constructorDataContext';
import { postOrder } from '../../../utils/api';

const initialTotalPriceState = { total: 0 };

function totalReducer(totalPriceState, action) {
    switch (action.type) {
        case "sum":
            return { total: totalPriceState.total + action.number };
        case "reset":
          return { total: 0 };
        default:
          throw new Error(`Wrong type of action: ${action.type}`);
      }
  }

function BurgerConstructorTotal() {
    const { constructorData } = useContext(ConstructorDataContext);
    const [visibleModal, setVisibleModal] = useState(false);
    const [totalPriceState, totalPriceDispatch] = useReducer(totalReducer, initialTotalPriceState);
    const [ numberOrder, setNumberOrder ] = useState(0);
    const [fetchState, setFetchState] = useState({ 
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
        for (let goods of constructorData) { 
            if (goods.type === 'bun') {
                totalPriceDispatch({type: 'sum', number: goods.price})
            }
            totalPriceDispatch({type: 'sum', number: goods.price})
        };
    }

    function createGoodsIdArray() {
        let idArray = [];
        constructorData.map(goods => idArray.push(goods._id));

        return idArray;
    }

    const onOpenModal = () => {
        const orderIdArray = createGoodsIdArray();

        setFetchState({hasError: false, loading: true });
        postOrder(orderIdArray)
            .then(message => {
                if (message.success) {
                    setNumberOrder(message.order.number)
                    setFetchState({ ...fetchState, loading: false })
                } else setFetchState({ hasError: true, loading: false });
            })
        setVisibleModal(true)
    }

    const onCloseModal = () => {
        setVisibleModal(false)
    }

    const onKeyPressCloseModal = (e) => {
        if (e.keyCode === 27) onCloseModal();
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
                <Button type="primary" size="large" htmlType="button" onClick={() => onOpenModal()}>
                    Оформить заказ
                </Button>
            </div>
            {visibleModal && 
                <Modal
                    closeModal={onCloseModal}
                    keypressCloseModal={onKeyPressCloseModal}
                    visibleModal={visibleModal}
                    order={true}
                    numberOrder={numberOrder}
                    hasError={fetchState.hasError}
                    loading={fetchState.loading}
                />
            }
        </>
    )
}

export default BurgerConstructorTotal