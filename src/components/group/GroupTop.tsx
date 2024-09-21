import { faPlus, faDoorOpen, faRightToBracket, faUsersSlash, faList, faCog, faPencil, faSignsPost } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { group } from 'console';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import image from "../../images/default_group_pfp.jpg"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { UserOne } from '../../types/user.types';
import { icon } from '@fortawesome/fontawesome-svg-core';
import GroupLink from './GroupLink';

interface Props {
    isSubbed: boolean
    pfp: string | null
    name: string
    id: number
    isAuthorized: boolean
    admin: UserOne
}

const GroupTop = (props: Props) => {
    const user = useSelector((state: RootState) => state.auth.user)

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
                    (user && user.id == props.admin.id) && (
                        <div className='d-flex flex-row'>
                            <GroupLink 
                                url={`/groups/${props.id}/posts`} 
                                text={"Posts"} 
                                icon={faSignsPost} 
                                extraClass="ms-2"
                            />

                            <GroupLink 
                                url={`/groups/${props.id}/suggest-posts`} 
                                text={"Posts suggest"} 
                                icon={faList} 
                                extraClass="ms-2"
                            />

                            <GroupLink 
                                url={`/groups/${props.id}/banned-users`} 
                                text={"Banned users"} 
                                icon={faUsersSlash} 
                                extraClass="ms-2"
                            />

                            <GroupLink 
                                url={`/groups/${props.id}/edit`} 
                                text={"Edit"} 
                                icon={faPencil} 
                                extraClass="ms-2"
                            />
                        </div>
                    )
                }
                {
                    props.isAuthorized && (
                        <div className='d-flex flex-row'>
                            <GroupLink 
                                url={`/groups/${props.id}/create-post`} 
                                text={"Create post"} 
                                icon={faPlus} 
                                extraClass="ms-2"
                            />

                            {
                                props.isSubbed ? (
                                    <GroupLink 
                                        url={`/groups/${props.id}/leave`} 
                                        text={"Leave"} 
                                        icon={faDoorOpen} 
                                        extraClass="ms-2"
                                    />
                                ) : (
                                    <GroupLink 
                                        url={`/groups/${props.id}/join`}
                                        text={"Join"} 
                                        icon={faRightToBracket} 
                                        extraClass="ms-2"
                                    />
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