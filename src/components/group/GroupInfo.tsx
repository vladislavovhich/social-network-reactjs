import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

interface Props {
    subs: number
    created: string
}

const GroupInfo = (props: Props) => {
    return (
        <div className='d-flex flex-row justify-content-center'>
            <div className='d-flex flex-column align-items-center'>
                <div className='text-white font-weight-bold'>{props.subs}</div>
                <div className='text-gr-dark'>Member(s)</div>
            </div>
            <div className='d-flex flex-column align-items-center ms-3'>
                <div className='text-white font-weight-bold'>{props.created}</div>
                <div className='text-gr-dark'>Created at</div>
            </div>
        </div>
    )
}

export default GroupInfo