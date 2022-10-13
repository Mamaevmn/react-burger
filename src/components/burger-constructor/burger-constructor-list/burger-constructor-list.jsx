import { useContext } from 'react';
import constructorStyle from './burger-constructor-list.module.css'
import touchSvg from './../../../images/icons/touch-btn.svg'
import { useRef } from 'react';
import BurgerConstructorListItem from './burger-constructor-list-item/burger-constructor-list-item';
import { ConstructorDataContext } from '../../../contexts/constructorDataContext';
import classNames from 'classnames';

function BurgerConstructorList() {
    const { constructorData } = useContext(ConstructorDataContext)
    const itemRef = useRef();

    return (
        <div className={classNames(constructorStyle.wrapper, 'pl-8')}>
            {!!constructorData.length &&
                <>                
                    <BurgerConstructorListItem 
                        isLocked={true}
                        text={`${constructorData[0].name} (верх)`}
                        {...constructorData[0]}
                    />
                    {
                        constructorData.length > 1 ?
                            <ul className={classNames(constructorStyle.list, 'scroll-block')}>
                                {constructorData.map((goods, idx) => {
                                    if (idx > 0 && idx !== constructorData.length - 1 ) {
                                        return (
                                            <li key={goods.u_id} className={constructorStyle.constructor_element} ref={itemRef}>
                                                <button className={constructorStyle.touch_btn}>
                                                    <img src={touchSvg} alt="touch-icon" />
                                                </button>
                                                <BurgerConstructorListItem 
                                                    {...goods}
                                                />
                                            </li>
                                        )
                                    }
                                })}
                            </ul> : null
                    }
                    <BurgerConstructorListItem 
                        isLocked={true}
                        text={`${constructorData[ constructorData.length - 1 ].name} (низ)`}
                        {...constructorData[ constructorData.length - 1 ]}
                    />
                </>
            }
        </div>
    )
}

export default BurgerConstructorList