import React from 'react';
import ReactDOM from 'react-dom/client';
import pfp from "../../images/default_user_pfp.jpg"
import "../../styles/user-top.css"
import { Link } from 'react-router-dom';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    username: string
    userId: number
    pfp: string | null
    pfpLeft?: boolean | null
    showVerified?: boolean | null
    isVerified?: boolean | null
    extraClass?: string | null
}

export const UserTop: React.FC<Props> = (props) => {
    return (
        <div className={`UserTop d-flex align-items-center ${props.extraClass}`}>
            {
                props.pfpLeft ? (
                    <>
                        {
                            props.pfp ? (
                                <img src={props.pfp} alt="pfp" />
                            ) : (
                                <img src={pfp} alt="pfp"/>
                            )
                        }
                        <div>
                            <Link to={`/profile/${props.userId}`} className='user-link ms-2'>
                                {props.username}   
                                {
                                    props.isVerified ? (
                                        <FontAwesomeIcon icon={faCircleCheck} className='text-success ms-2'/>
                                    ) : (
                                        <FontAwesomeIcon icon={faCircleExclamation} className='text-danger ms-2'/>
                                    )
                                }   
                            </Link>
                        </div>
                    </>    
                ) : (
                    <>
                        <div>
                            <Link to={`/profile/${props.userId}`} className='user-link me-2'>
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
                    </> 
                )
            }
        </div>
    )
}