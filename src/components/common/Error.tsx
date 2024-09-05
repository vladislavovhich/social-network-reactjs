import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

interface Props {
    message?: string
}

const ErrorPage = (props: Props) => {
    const {message} = props

    return (
        <div>
            <p className='text-danger'>{message}</p>
        </div>
    )
}

export default ErrorPage