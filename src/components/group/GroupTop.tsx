import { faPlus, faDoorOpen, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { group } from 'console';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import image from "../../images/default_group_pfp.jpg"
import { Link } from 'react-router-dom';

interface Props {
    isSubbed: boolean
    pfp: string | null
    name: string
    id: number
    isAuthorized: boolean
}

const GroupTop = (props: Props) => {
    return (
        <div>
            <div className='d-flex flex-row align-items-center justify-content-between'>
                <div className='d-flex flex-row align-items-center'>
                    {
                        props.pfp ? (
                            <img src={props.pfp} alt="pfp" className='group-pfp'/>
                        ) : (
                            <img src={image} alt="pfp" className='group-pfp'/>
                        )
                    }

                    <h2 className='text-white h2 ms-3'>{props.name}</h2>
                </div>

                {
                    props.isAuthorized && (
                        <div className='d-flex flex-row'>
                            <Link to='/groups/:groupId/create-post' className='group-link'>
                                <FontAwesomeIcon icon={faPlus} className='me-2'/>
                                <span>Create post</span>
                            </Link>
                            {
                                props.isSubbed ? (
                                    <Link to={`/groups/${props.id}/leave`} className='group-link ms-2'>
                                        <FontAwesomeIcon icon={faDoorOpen} className='me-2' />
                                        <span>Leave</span>
                                    </Link>
                                ) : (
                                    <Link to={`/groups/${props.id}/join`} className='group-link ms-2'>
                                        <FontAwesomeIcon icon={faRightToBracket} className='me-2' />
                                        <span>Join</span>
                                    </Link>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default GroupTop