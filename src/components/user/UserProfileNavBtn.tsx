import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, NavLink } from 'react-router-dom';

interface Props {
    url: string
    text: string
    isActive?: boolean
    icon: any
}

const UserProfileNavBtn = (props: Props) => {
    const {url, text, isActive, icon} = props

    return (
        <NavLink 
            to={url}
            className={({isActive}) => (isActive ? 'user-pfp-active-link user-pfp-link' : 'user-pfp-not-active-link user-pfp-link')}
        >
            {text}
            <FontAwesomeIcon icon={icon} className='icon ps-2'/>
        </NavLink>
    )
}

export default UserProfileNavBtn