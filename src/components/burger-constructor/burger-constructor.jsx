import classNames from 'classnames';
import constructorStyle from './burger-constructor.module.css'
import BurgerConstructorTotal from './burger-constructor-total/burger-constructor-total';
import BurgerConstructorList from './burger-constructor-list/burger-constructor-list';
import { ConstructorDataContext } from '../../utils/constructorDataContext';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../utils/dataContext';

function BurgerConstructor() {
    const [ constructorData, setConstructorData ] = useState([]);
    const { data } = useContext(DataContext)

    useEffect(() => {
        setConstructorData(filterNumberBuns());
    }, [setConstructorData])

    function filterNumberBuns() {
        const newData = [];
        let hasBun = false;

        data.data.map((ingredient, idx) => {
            if (ingredient.type === 'bun' && !hasBun) {
                hasBun = true;
                newData.unshift(ingredient)
                newData.push(ingredient)
            }
            if (ingredient.type !== 'bun' && idx % 3 === 0) {
                { newData.length ? 
                    newData.splice( newData.length - 1, 0 , ingredient) :
                    newData.push(ingredient)
                }
            }
        })

        return newData
    }
    
    return (
        <section className={classNames(constructorStyle.section, 'pt-25', 'pl-4', 'pr-4')}>
            <ConstructorDataContext.Provider value={{ constructorData, setConstructorData }}>
                <BurgerConstructorList />
                <BurgerConstructorTotal />
            </ConstructorDataContext.Provider>
        </section>
    )
}

export default BurgerConstructor