import { useContext } from 'react';
import constructorStyle from './burger-constructor-list.module.css'
import touchSvg from './../../../images/icons/touch-btn.svg'
import { useRef } from 'react';
import BurgerConstructorListItem from './burger-constructor-list-item/burger-constructor-list-item';
import { ConstructorDataContext } from '../../../utils/constructorDataContext';

function BurgerConstructorList() {
    const { constructorData } = useContext(ConstructorDataContext)
    const itemRef = useRef();

    return (
        <div className='pl-8' style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {!!constructorData.length &&
                <>                
                    <BurgerConstructorListItem 
                        key="0"
                        isLocked={true}
                        text={`${constructorData[0].name} (верх)`}
                        {...constructorData[0]}
                    />
                    {
                        constructorData.length > 1 ?
                            <ul className='scroll-block scroll-block--medium' style={{marginLeft: '-32px', paddingLeft: '32px'}}>
                                {constructorData.map((goods, idx) => {
                                    if (idx > 0) {
                                        return <li key={idx} className={constructorStyle.constructor_element} ref={itemRef}>
                                                <button className={constructorStyle.touch_btn}>
                                                    <img src={touchSvg} alt="touch-icon" />
                                                </button>
                                                <BurgerConstructorListItem 
                                                    key={idx}
                                                    {...goods}
                                                />
                                            </li>
                                    }
                                })}
                            </ul> : null
                    }
                    <BurgerConstructorListItem 
                        key={constructorData[0]}
                        isLocked={true}
                        text={`${constructorData[0].name} (низ)`}
                        {...constructorData[0]}
                    />
                </>
            }
        </div>
    )
}

export default BurgerConstructorList