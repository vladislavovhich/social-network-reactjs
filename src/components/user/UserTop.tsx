import React from 'react';
import ReactDOM from 'react-dom/client';
import pfp from "../../images/default_user_pfp.jpg"
import "../../styles/user-top.css"

interface Props {
    username: string
    userId: number
    pfp: string | null
}

export const UserTop: React.FC<Props> = (props) => {
    return (
        <div className='UserTop d-flex align-items-center'>
            <div>
                <a href={`/users/${props.userId}`} className='user-link me-2'>{props.username}</a>
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