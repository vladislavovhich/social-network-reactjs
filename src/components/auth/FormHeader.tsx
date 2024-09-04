import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';

interface Props {
    text: string
    spacing: string
    width: string
}

const FormHeader = (props: Props) => {
    const {text, spacing, width} = props

    return (
        <div className={`${width} ${spacing}`}>
            <p className='text-white text-start mt-1'>{text}</p>
            <div className='hr'/>
        </div>
    )
}

export default FormHeader