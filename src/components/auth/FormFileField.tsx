import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setOneFile } from '../../store/reducers/file.slice';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pfp from "../../images/default_user_pfp.jpg"

interface Props {
    text: string,
    extraClass?: string
}

const FormFileField = (props: Props) => {
    const {text, extraClass} = props

    const dispatch = useDispatch<AppDispatch>()
    const {fileOnePreview, fileOne} = useSelector((state: RootState) => state.file)

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

            dispatch(setOneFile({file: urlFile, preview: base64file}))
        }
    }

    const fileButtonClick = (e: React.MouseEvent<HTMLElement>) => {
        fileInputRef.current?.click()
    }

    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <div className={`form-group mt-2 d-flex flex-column ${extraClass}`}>
            <label className='text-white mb-2'>{text}</label>
            <div className='d-flex flex-row align-items-center'>
                <input type="file" accept="image/*" hidden onChange={handleFileChange} ref={fileInputRef}/>
                <img className='img-pfp' src={fileOnePreview ? fileOnePreview : pfp}/>
                <button className='btn btn-info text-black ms-2 file-upload-btn flex-grow-1' type='button' onClick={fileButtonClick}>
                    <span className='me-2'>Upload file</span>
                    <FontAwesomeIcon icon={faUpload} />
                </button>
            </div>
        </div>
    )
}

export default FormFileField