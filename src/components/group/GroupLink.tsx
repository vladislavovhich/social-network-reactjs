import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, NavLink } from 'react-router-dom';

interface Props {
    url: string
    text: string
    icon: IconProp
    extraClass?: string
}

const GroupLink = (props: Props) => {
    const {url, text, icon, extraClass} = props

    const name = `d-flex flex-row align-items-center ${extraClass}`
    
    return (
        <NavLink 
            to={url} 
            className={({isActive}) =>  `group-link ${name} ${(isActive ? 'group-link-active' : 'group-link-not-active')}`}
        >
            <FontAwesomeIcon icon={icon} className='me-2'/>
            <span>{text}</span>
        </NavLink>
    )
}

export default GroupLink