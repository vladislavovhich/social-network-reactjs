import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import "../styles/common.css"
import { Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { authMe } from '../store/reducers/auth.slice';
import Header from './common/Header';

const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(authMe())
  }, [dispatch])

  return (
    <div className="App bg-dark">
      <Header />
      <main className='mt-3 mb-3'>
        <div className='container'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
