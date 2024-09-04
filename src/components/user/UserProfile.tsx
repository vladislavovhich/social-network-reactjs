import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useSelector } from 'react-redux';
import { Outlet, redirect, useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import pfp from "../../images/default_user_pfp.jpg"
import "../../styles/user-profile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation, faCog, faCogs, faComments, faSignsPost, faUserGroup, faUserPlus, faUsersLine } from '@fortawesome/free-solid-svg-icons';
import UserProfileNavBtn from './UserProfileNavBtn';

const UserProfile = () => {
    const { userId } = useParams();

    const user = useSelector((state: RootState) => state.auth.user)

    if (!user) {
        redirect("/login")

        return null
    }

    const birthDate = new Date(user.birthDate)
    const curDate = new Date()

    const age = curDate.getFullYear() - birthDate.getFullYear()

    return (
        <div className='d-flex flex-column'>
            <div className='d-flex flex-row mb-3'>
                {
                    user && user.pfp ? (
                        <img src={user.pfp.url} alt="pfp" className='user-pfp'/>
                    ) : (
                        <img src={pfp} alt="pfp" className='user-pfp'/>
                    )
                }

                <div className='d-flex flex-column justify-content-between ms-3 flex-grow-1'>
                    <div className='text-white'>
                        Username: 
                        <span className='user-info-framed ms-2'>{user.username}</span>
                        {user.isVerified ? (
                            <FontAwesomeIcon icon={faCircleCheck} className='text-success ms-2'/>
                        ) : (
                            <FontAwesomeIcon icon={faCircleExclamation} className='text-danger ms-2'/>
                        )}
                    </div>

                    <div className='hr my-1'/>

                    <div className='text-white'>
                        Email:
                        <span className='user-info-framed ms-2'>{user.email}</span>
                    </div>

                    <div className='hr my-1'/>

                    <div className='text-white'>
                        Age:
                        <span className='user-info-framed ms-2'>{age} y. o.</span>
                    </div>
                </div>
            </div>
            
            <div className='hr'/>

            <div className='d-flex flex-row my-3 justify-content-center'>
                <UserProfileNavBtn 
                    text='Groups'
                    url='/profile/groups'
                    icon={faUsersLine}
                />

                <UserProfileNavBtn 
                    text='Friends'
                    url='/profile/friends'
                    icon={faUserGroup}
                />

                <UserProfileNavBtn 
                    text='Requests'
                    url='/profile/requests'
                    icon={faUserPlus}
                />

                <UserProfileNavBtn 
                    text='Posts'
                    url='/profile/posts'
                    icon={faSignsPost}
                />

                <UserProfileNavBtn 
                    text='Comments'
                    url='/profile/comments'
                    icon={faComments}
                />

                <UserProfileNavBtn 
                    text='Settings'
                    url='/profile/settings'
                    icon={faCogs}
                />
            </div>

            <div className='hr'/>

            <div className='pt-3'>
                <Outlet />
            </div>
        </div>
    )
}

export default UserProfile