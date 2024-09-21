import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useSelector, useDispatch } from 'react-redux';
import { setDate, setLogin, setPassword, setUsername, register as registerThunk } from '../../store/reducers/auth.slice';
import { RootState, AppDispatch } from '../../store/store';
import "../../styles/register.css"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import FormField from './FormField';
import FormHeader from './FormHeader';
import FormFileField from './FormFileField';
import Spinner from 'react-bootstrap/Spinner'

const FormSchema = Yup.object({
    username: Yup.string().min(5).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(5).max(35).required(),
    birthDate: Yup.string().required()
})

interface IForm {
    username: string
    email: string
    password: string
    birthDate: string
}

const Register = () => {
    const {login, password, birthDate, username} = useSelector((state: RootState) => state.auth)
    const {fileOne: file} = useSelector((state: RootState) => state.file)

    const {error, status} = useSelector((state: RootState) => state.auth.registerThunk)
    const dispatch = useDispatch<AppDispatch>()

    const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IForm>({
        resolver: yupResolver(FormSchema),
        defaultValues: {email: login, password, username, birthDate: birthDate || ""}
    });

    const formOnSubmit = async (data: IForm) => {
        const formData = new FormData()
        const date = birthDate ? (new Date(birthDate)).toISOString() : (new Date()).toISOString()

        formData.append("email", login)
        formData.append("password", password)
        formData.append("birthDate", date)
        formData.append("username", username)
        
        if (file) {
            const res = await fetch(file)
            const blob = await res.blob()

            formData.append("file", blob)
        }

        dispatch(registerThunk(formData))
    }

    return (
        <div className="Register row">
            <form className='d-flex flex-column align-items-center' onSubmit={handleSubmit(formOnSubmit)}>
                <FormHeader 
                    text='Sign-in Data' 
                    spacing='my-2'
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

                <FormHeader 
                    text='Profile Info' 
                    spacing='my-2'
                    width='col-5'
                />

                <FormField 
                    type='date'
                    register={register("birthDate")}
                    value={birthDate || ""}
                    placeholder='Enter date'
                    error={errors.birthDate}
                    id='birthDate'
                    extraClass='mt-1'
                    action={setDate}
                    labelText='Birth Date'
                    clearError={clearErrors}
                />

                <FormField 
                    type='text'
                    register={register("username")}
                    value={username}
                    placeholder='Enter username'
                    error={errors.username}
                    id='username'
                    extraClass='mt-1'
                    action={setUsername}
                    labelText='Username'
                    clearError={clearErrors}
                />

                <FormFileField text="Profile Picture" />

                <span className='hr col-5 my-3'/>

                {
                    error && <p className='text-danger'>{error}</p>
                }

                {
                    status == "pending" ? (
                        <Spinner animation="border" variant='info' />
                    ) : (
                        <input 
                            type='submit' 
                            className='btn btn-info col-5' 
                            value="Sign up" 
                            data-bs-theme="dark"
                        />
                    )
                }
            </form>
        </div>
    );
}
  
export default Register;
