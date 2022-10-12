import { useContext } from 'react';
import constructorStyle from './burger-constructor-list.module.css'
import touchSvg from './../../../images/icons/touch-btn.svg'
import { useRef } from 'react';
import BurgerConstructorListItem from './burger-constructor-list-item/burger-constructor-list-item';
import { ConstructorDataContext } from '../../../utils/constructorDataContext';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

function BurgerConstructorList() {
    const { constructorData } = useContext(ConstructorDataContext)
    const itemRef = useRef();

    return (
        <div className={classNames(constructorStyle.wrapper, 'pl-8')}>
            {!!constructorData.length &&
                <>                
                    <BurgerConstructorListItem 
                        key={nanoid()}
                        isLocked={true}
                        text={`${constructorData[0].name} (верх)`}
                        {...constructorData[0]}
                    />
                    {
                        constructorData.length > 1 ?
                            <ul className={constructorStyle.list} style={{marginLeft: '-32px', paddingLeft: '32px'}}>
                                {constructorData.map((goods, idx) => {
                                    if (idx > 0 && idx !== constructorData.length - 1 ) {
                                        return <li key={nanoid()} className={constructorStyle.constructor_element} ref={itemRef}>
                                                <button className={constructorStyle.touch_btn}>
                                                    <img src={touchSvg} alt="touch-icon" />
                                                </button>
                                                <BurgerConstructorListItem 
                                                    key={nanoid()}
                                                    {...goods}
                                                />
                                            </li>
                                    }
                                })}
                            </ul> : null
                    }
                    <BurgerConstructorListItem 
                        key={nanoid()}
                        isLocked={true}
                        text={`${constructorData[constructorData.length - 1 ].name} (низ)`}
                        {...constructorData[ constructorData.length - 1 ]}
                    />
                </>
            }
        </div>
    )
}

export default BurgerConstructorList