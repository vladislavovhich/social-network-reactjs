import { faUsersLine, faUserGroup, faUserPlus, faSignsPost, faComments, faCogs } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import UserProfileNavBtn from './UserProfileNavBtn';

interface Props {
    isOwner: boolean
    userId: number
}

const UserNavBar = (props: Props) => {
    const {userId, isOwner} = props

    return (
        <div className='d-flex flex-row my-3 justify-content-center'>
            <UserProfileNavBtn 
                text='Groups'
                url={`/profile/${userId}/groups`}
                icon={faUsersLine}
            />

            <UserProfileNavBtn 
                text='Friends'
                url={`/profile/${userId}/friends`}
                icon={faUserGroup}
            />

            <UserProfileNavBtn 
                text='Requests'
                url={`/profile/${userId}/requests`}
                icon={faUserPlus}
            />

            <UserProfileNavBtn 
                text='Posts'
                url={`/profile/${userId}/posts`}
                icon={faSignsPost}
            />

            <UserProfileNavBtn 
                text='Comments'
                url={`/profile/${userId}/comments`}
                icon={faComments}
            />

            {
                isOwner && (
                    <UserProfileNavBtn 
                        text='Settings'
                        url={`/profile/settings`}
                        icon={faCogs}
                    />
                )
            }
        </div>
    )
}

export default UserNavBar