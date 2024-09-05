import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from "react-router-dom"
import image from "../../images/default_group_pfp.jpg"
import { Group } from '../../types/group.types';

const GroupOne = (props: Group) => {
    const {id, name, pfp} = props

    return (
        <div className='group-list-item d-flex flex-row'>
            {
                pfp  ? (
                    <img src={pfp.url} alt="pfp" className='user-info-group-img'/>
                ) : (
                    <img src={image} alt="pfp" className='user-info-group-img'/>
                )
            }

            <div className='d-flex flex-column ms-2'>
                <Link to={`/groups/${id}`} className='user-info-group-link'>{name}</Link>
                <input type='button' value='Unsubscribe' className='btn btn-danger mt-2'/>
            </div>
        </div>
    )
}

export default GroupOne