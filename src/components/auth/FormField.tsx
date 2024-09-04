import React, { useRef } from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface Props {
    type: "text" | "password" | "email" | "date"
    value: string
    error: FieldError | undefined
    action: ActionCreatorWithPayload<string>
    register: UseFormRegisterReturn
    extraClass?: string | undefined
    labelText: string
    id: string
    placeholder?: string | undefined
}

const FormField = (props: Props) => {
    const {error, type, action, register, extraClass, value, id, labelText, placeholder} = props

    const dispatch = useDispatch<AppDispatch>()
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(action(e.target.value))
    }

    return (
        <div className={`form-group col-5 ${extraClass}`}>
            <label htmlFor={id} className='text-white mb-1'>{labelText}</label>
            <input 
                type={type} 
                className="form-control" 
                id={id} 
                placeholder={placeholder} 
                data-bs-theme="dark"
                value={value}
                {...register}
                onChange={handleInputChange}
            />
            {error && <span className='text-danger my-1'>{error.message}</span>}
        </div>
    )
}

export default FormField