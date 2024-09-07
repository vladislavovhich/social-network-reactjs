import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

interface Props {
    text: string
}

const GroupDescription = (props: Props) => {
    return (
        <div className='my-3 d-flex flex-column'>
            <div className='text-white me-2 mb-2 h5'>Description</div>
            <span className='text-gr-dark'>{props.text}</span>
        </div>
    )
}

export default GroupDescription