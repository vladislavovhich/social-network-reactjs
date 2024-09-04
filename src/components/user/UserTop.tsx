import React from 'react';
import ReactDOM from 'react-dom/client';
import pfp from "../../images/default_user_pfp.jpg"
import "../../styles/user-top.css"
import { Link } from 'react-router-dom';

interface Props {
    username: string
    userId: number
    pfp: string | null
}

export const UserTop: React.FC<Props> = (props) => {
    return (
        <div className='UserTop d-flex align-items-center'>
            <div>
                <Link to="/profile" className='user-link me-2'>
                    {props.username}      
                </Link>
            </div>
            {
                props.pfp ? (
                    <img src={props.pfp} alt="pfp" />
                ) : (
                    <img src={pfp} alt="pfp"/>
                )
            }
        </div>
    )
}