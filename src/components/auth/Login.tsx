import React from 'react';
import ReactDOM from 'react-dom/client';
import { RootState, AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setPassword, auth } from '../../store/reducers/auth.slice';
import FormHeader from './FormHeader';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import FormField from './FormField';
import { Spinner } from 'react-bootstrap';

const FormSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(5).max(35).required(),
})

interface IForm {
  email: string
  password: string
}

const Login = () => {
    const {error, status} = useSelector((state: RootState) => state.auth.authThunk)
    const {login, password} = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch<AppDispatch>()

    const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IForm>({
        resolver: yupResolver(FormSchema),
        defaultValues: {email: login, password}
    });

    const formOnSubmit = (data: IForm) => {
      dispatch(auth(data))
    }

    return (
      <div className='row'>
        <form className='d-flex flex-column align-items-center'  onSubmit={handleSubmit(formOnSubmit)}>
          <FormHeader 
              text='Sign-in Data' 
              spacing=''
              width='col-5'
          />

          <FormField 
                type='text'
                register={register("email")}
                value={login}
                placeholder='Enter email'
                error={errors.email}
                id='email'
                action={setLogin}
                labelText='Email'
                clearError={clearErrors}
                extraClass='mt-3'
            />

            <FormField 
                type='password'
                register={register("password")}
                value={password}
                placeholder='Enter password'
                error={errors.password}
                id='password'
                extraClass='mt-1'
                action={setPassword}
                labelText='Password'
                clearError={clearErrors}
            />

          {
            error && (
              <div className='text text-danger mt-2'>{error}</div>
            )
          }

          <div className='hr col-5 my-4'/>
            {
              status == "pending" ? (
                  <Spinner animation="border" variant='info' />
              ) : (
                  <input 
                      type='submit' 
                      className='btn btn-info col-5' 
                      value="Sign in" 
                      data-bs-theme="dark"
                  />
              )
            }
        </form>
      </div>
    );
  }
  
export default Login;
  