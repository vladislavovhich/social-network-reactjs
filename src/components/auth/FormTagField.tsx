import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { FieldError, UseFormClearErrors, UseFormRegisterReturn } from 'react-hook-form';
import FormHeader from './FormHeader';

interface Props<T extends Record<string, any>> {
    tags: string[]
    register: UseFormRegisterReturn,
    setTagText: (value: string) => void,
    addTag: (value: string) => void,
    removeTag: (value: string) => void,
    clearError: UseFormClearErrors<T>,
    trigger: () => Promise<boolean>,
    value: string,
    text: string,
    itemsText: string,
    error: FieldError | undefined,
    extraClass?: string
}

const FormTagField = <T extends Record<string, any>,>(props: Props<T>) => {
    const {tags, register, setTagText, addTag, trigger, value, removeTag, text, error, extraClass, itemsText} = props

    const handleTagsOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagText(e.target.value)
    }

    const handleTagAdd = async (e: React.MouseEvent<HTMLElement>) => {
        const result = await trigger()
        
        if (!result) {
            return
        }

        addTag(value)
    }

    return (
        <div className={`form-group ${extraClass}`}>
                <label htmlFor="tags-id" className='text-white mb-1'>{text}</label>
                <div className='d-flex flex-row'>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="tags-id" 
                        placeholder="Enter text" 
                        data-bs-theme="dark"
                        value={value}
                        {...register}
                        onChange={handleTagsOnChange}
                    />
                    <input type='button' className='btn btn-info ms-2' value="Add" onClick={handleTagAdd}/>
                </div>

                {
                    !!tags.length && (
                        <div className='d-flex flex-column mt-2'>
                            <FormHeader 
                                text={itemsText} 
                                spacing='mb-2'
                                width='w-100'
                            />
                            <div className='d-flex flex-row'>
                                {
                                    tags.map((tag, index) => {
                                        const handleDeleteOnClick = (e: React.MouseEvent<HTMLElement>) => {
                                            removeTag(tag)
                                        }
    
                                        return (
                                            <div key={index} className={`text-white d-flex flex-row align-items-center tag-add ${index != 0 && "ms-1"}`}>
                                                <div className='tag-text'>#{tag}</div>
                                                <button className='tag-btn text-white' onClick={handleDeleteOnClick}>
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }

                {error && <span className='text-danger my-1'>{error.message}</span>}
            </div>
    )
}

export default FormTagField