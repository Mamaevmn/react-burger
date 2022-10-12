import { useEffect, useState, useContext, useReducer } from 'react';
import classNames from 'classnames';
import mainStyle from './app-main.module.css';
import BurgerIngredients from './../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';
import { DataContext } from '../../utils/dataContext';
import { getData } from '../../utils/api';

const initialDataState = [];

function dataReducer(data, action) {
  switch (action.type) {
      case "set":
          return { data: [...action.data] };
      case "reset":
          return { data: initialDataState };
      default:
          throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function AppMain() {
    const [ data, dataDispatch ] = useReducer(dataReducer, initialDataState);
    const [fetchState, setFetchState] = useState({ 
        hasError: false,
        loading: true,
      }
    )
  
    useEffect(() => {
      setFetchState({hasError: false, loading: true });
      
      getData().then(message => {
        dataDispatch({type: 'set', data: message.data})
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
                 data.data.length &&
                    <>
                        <BurgerIngredients data={data.data}/>
                        <DataContext.Provider value={{ data, dataDispatch }}>
                            <BurgerConstructor />
                        </ DataContext.Provider>
                    </>
                }
            </div>
        </main>
    )
}

export default AppMain