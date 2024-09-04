import React from 'react';
import ReactDOM from 'react-dom/client';
import { RootState, AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {setLogin, setPassword } from '../../store/auth-reducer';
import { auth as authThunk } from '../../store/auth-reducer';

const Login: React.FC = () => {
    const loginError = useSelector((state: RootState) => state.auth.authThunk.error)
    const login = useSelector((state: RootState) => state.auth.login)
    const password = useSelector((state: RootState) => state.auth.password)

    const dispatch = useDispatch<AppDispatch>()

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setLogin(e.target.value))
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setPassword(e.target.value))
    }

    const check = (event: React.MouseEvent<HTMLElement>) => {
      dispatch(authThunk({email: login, password}))
    }

    return (
      <div className='row'>
        <form className='d-flex flex-column align-items-center'>
          <div className="form-group col-5">
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              placeholder="Enter email" 
              data-bs-theme="dark"
              value={login}
              onChange={handleLoginChange}
              />
          </div>
          <div className="form-group col-5">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              placeholder="Password" 
              data-bs-theme="dark"
              value={password}
              onChange={handlePasswordChange}
              />
          </div>
          {
            loginError && (
              <div className='text text-danger mt-2'>{loginError}</div>
            )
          }
          <input 
            type='button' 
            className='btn btn-info mt-3 col-5' 
            value="Sign in" 
            data-bs-theme="dark"
            onClick={check}
          />
        </form>
      </div>
    );
  }
  
export default Login;
  