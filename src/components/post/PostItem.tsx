import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';

interface Props {
    text: string
    icon: IconProp
    url: string
}

const PostItem = (props: Props) => {
    const {text, icon, url} = props

    return (
        <div className='ms-2 d-flex flex-row user-info-framed align-items-center'>
            <Link to={url} className='text-white d-flex flex-row align-items-center text-decoration-none'>
                <FontAwesomeIcon icon={icon} className='text-white me-2'/>
                <div className='text-white'>{text}</div>
            </Link>
        </div>
    )
}

export default PostItem