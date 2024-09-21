import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeManyFile, setManyFile } from '../../store/reducers/file.slice';
import { AppDispatch, RootState } from '../../store/store';
import { faPlus, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../../styles/form-img.css"

const FormFileManyField = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {fileMany} = useSelector((state: RootState) => state.file)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const urlFile = URL.createObjectURL(file)
            const base64file = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader()

                reader.onloadend = () => {
                    const result = reader.result as string
                        
                    resolve(result)
                }
    
                reader.readAsDataURL(file)
            })

            dispatch(setManyFile({file: urlFile, preview: base64file}))
        }
    }

    const fileButtonClick = (e: React.MouseEvent<HTMLElement>) => {
        fileInputRef.current?.click()
    }

    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <div className='form-group mt-2 d-flex flex-column'>
            <label className='text-white mb-2'>Attached images</label>

            <button type='button' onClick={fileButtonClick} className='btn btn-info d-flex flex-row align-items-center justify-content-center'>
                <div>Attach image</div>
                <FontAwesomeIcon icon={faPlus} className='mt-1 ms-2'/>
            </button>
            
            <input type="file" accept="image/*" hidden onChange={handleFileChange} ref={fileInputRef}/>

            <div>
                {
                    fileMany.map((item) => {
                        const {preview, id} = item

                        const handleRemove = (e: React.MouseEvent<HTMLElement>) => {
                            dispatch(removeManyFile(id))
                        }

                        return (
                            <div className='d-flex flex-column mt-3' key={id}>
                                <div className='d-flex flex-row align-items-center'>
                                    <div className='text-white me-2'>{id}</div>
                                    <button 
                                        type="button" 
                                        className='btn btn-primary d-flex flex-row align-items-center justify-content-center align-self-end'
                                        onClick={handleRemove}
                                    >
                                        <div>Remove</div>
                                        <FontAwesomeIcon icon={faTrash} className='ms-2 mt-1' />
                                    </button>
                                </div>

                                <img src={preview} className='form-img mt-2'/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FormFileManyField