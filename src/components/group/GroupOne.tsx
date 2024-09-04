import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from "react-router-dom"
import image from "../../images/default_group_pfp.jpg"
import { Group } from "../../types/user.types"

const GroupOne = (props: Group) => {
    const {id, name, pfp} = props

    return (
        <div className='group-list-item'>
            {
                pfp  ? (
                    <img src={pfp.url} alt="pfp" className='user-info-group-img'/>
                ) : (
                    <img src={image} alt="pfp" className='user-info-group-img'/>
                )
            }

            <Link to={`/groups/${id}`} className='user-info-group-link user-info-framed ms-2'>{name}</Link>
        </div>
    )
}

export default GroupOne