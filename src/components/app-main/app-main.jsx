import { useEffect, useState, useContext } from 'react';
import classNames from 'classnames';
import mainStyle from './app-main.module.css';
import BurgerIngredients from './../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';
import { DataContext } from '../../utils/dataContext';
import { getData } from '../../utils/api';

function AppMain() {
    const [ data, setData ] = useState(useContext(DataContext));
    const [fetchState, setFetchState] = useState({ 
        hasError: false,
        loading: true,
      }
    )
  
    useEffect(() => {
      setFetchState({hasError: false, loading: true });
      
      getData().then(data => {
        setData(data.data)
        setFetchState({ ...fetchState, loading: false })
      })
        .catch(e => {
          setFetchState({ hasError: true, loading: false });
        });
    }, [])

    return (
        <main className={classNames(mainStyle.main, 'pt-10')}>
            <div className={classNames(mainStyle.main_container, 'container')}>
                {fetchState.loading && 'Загрузка...'}
                {fetchState.hasError && 'Произошла ошибка'}
                {!fetchState.loading &&
                 !fetchState.hasError &&
                 data.length &&
                    <>
                        <BurgerIngredients data={data}/>
                        <DataContext.Provider value={{ data, setData }}>
                            <BurgerConstructor />
                        </ DataContext.Provider>
                    </>
                }
            </div>
        </main>
    )
}

export default AppMain