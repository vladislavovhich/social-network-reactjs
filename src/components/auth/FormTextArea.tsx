import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { FieldError, Path, UseFormClearErrors, UseFormRegisterReturn } from 'react-hook-form';

interface Props<T extends Record<string, any>> {
    value: string
    error: FieldError | undefined
    action: ActionCreatorWithPayload<string>
    register: UseFormRegisterReturn
    extraClass?: string | undefined
    labelText: string
    id: Path<T>
    placeholder?: string | undefined
    clearError: UseFormClearErrors<T>
}

const FormTextArea = <T extends Record<string, any>,>(props: Props<T>) => {
    const {error, action, register, extraClass, value, id, labelText, placeholder, clearError} = props

    const dispatch = useDispatch<AppDispatch>()
    
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (clearError) {
            clearError(id)
        }

        dispatch(action(e.target.value))
    }

    return (
        <div className={`form-group ${extraClass}`}>
            <label htmlFor={id} className='text-white mb-1'>{labelText}</label>
            <textarea  
                className="form-control" 
                id={id} 
                placeholder={placeholder} 
                data-bs-theme="dark"
                value={value}
                {...register}
                rows={5}
                onChange={handleInputChange}
                style={{
                    resize: "none"
                }}
            />
            {error && <span className='text-danger my-1'>{error.message}</span>}
        </div>
    )
}

export default FormTextArea