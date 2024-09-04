import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setFilePreview } from '../../store/auth-reducer';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pfp from "../../images/default_user_pfp.jpg"

interface Props {
    text: string
    setFile: (file: File | null) => void
}

const FormFileField = (props: Props) => {
    const {text, setFile} = props

    const dispatch = useDispatch<AppDispatch>()
    const {filePreview} = useSelector((state: RootState) => state.auth)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setFile(file)

            const reader = new FileReader()

            reader.onloadend = () => {
                const result = reader.result as string
                    
                dispatch(setFilePreview(result))
            }

            reader.readAsDataURL(file)
        }
    }

    const fileButtonClick = (e: React.MouseEvent<HTMLElement>) => {
        fileInputRef.current?.click()
    }

    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <div className='form-group mt-2 d-flex flex-column col-5'>
            <label className='text-white mb-2'>{text}</label>
            <div className='d-flex flex-row align-items-center'>
                <input type="file" accept="image/*" hidden onChange={handleFileChange} ref={fileInputRef}/>
                <img className='img-pfp' src={filePreview ? filePreview : pfp}/>
                <button className='btn btn-info text-black ms-2 file-upload-btn flex-grow-1' type='button' onClick={fileButtonClick}>
                    <span className='me-2'>Upload file</span>
                    <FontAwesomeIcon icon={faUpload} />
                </button>
            </div>
        </div>
    )
}

export default FormFileField