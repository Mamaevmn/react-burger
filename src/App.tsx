import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import data from './data';
import AppMain from './components/app-main/app-main';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <AppMain data={data}/>
    </div>
  );
}

export default App;
