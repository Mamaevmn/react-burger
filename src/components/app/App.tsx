import { useEffect, useState } from 'react';
import appStyles from './App.module.css';
import AppHeader from './../app-header/app-header';
import AppMain from './../app-main/app-main';
import { getData, urlAPI } from '../../utils/const';

function App() {
  const [state, setState] = useState({ 
      data: [],
      hasError: false,
      loading: true,
    }
  )

  useEffect(() => {
    setState({ ...state, hasError: false, loading: true });
    
    getData().then(data => setState({ ...state, data: data.data, loading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, loading: false });
      });
  }, [])

  return (
    <div className={appStyles.App}>
      <AppHeader />
      {state.loading && 'Загрузка...'}
      {state.hasError && 'Произошла ошибка'}
      {!state.loading &&
        !state.hasError &&
        state.data.length &&
        <AppMain data={state.data}/>}
    </div>
  );
}

export default App;
