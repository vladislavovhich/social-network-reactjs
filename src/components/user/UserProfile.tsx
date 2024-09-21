import React, { useEffect } from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, redirect, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import pfp from "../../images/default_user_pfp.jpg"
import "../../styles/user-profile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation, faCog, faCogs, faComments, faSignsPost, faUserGroup, faUserPlus, faUsersLine } from '@fortawesome/free-solid-svg-icons';
import UserProfileNavBtn from './UserProfileNavBtn';
import { getUser, setUser } from '../../store/reducers/user.slice';
import UserNavBar from './UserNavBar';

const UserProfile = () => {
    const { userId } = useParams();

    const user = useSelector((state: RootState) => state.user.user)
    const userAuth = useSelector((state: RootState) => state.auth.user)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const id = parseInt(userId || "")

        if (userAuth && Number.isNaN(id)) {
            dispatch(setUser(userAuth))
        } else if (userAuth && userAuth.id == id) {
            dispatch(setUser(userAuth))
        } else {
            dispatch(getUser(id))
        }
    }, [userId, user])

    if (!user) {
        return null
    }

    const birthDate = new Date(user.birthDate)
    const curDate = new Date()

    const age = curDate.getFullYear() - birthDate.getFullYear()

    const isOwner = !!(user && userAuth && userAuth.id == user.id)

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

            <UserNavBar 
                isOwner={isOwner} 
                userId={user.id}            
            />

            <div className='hr'/>

            <div className='pt-3'>
                <Outlet />
            </div>
        </div>
    )
}

export default UserProfile