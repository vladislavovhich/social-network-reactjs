import React, { useEffect } from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import { UserOne } from '../../types/user.types';
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserTop } from './UserTop';
import { UserBanned } from '../../types/group.types';

interface Props {
    users: UserOne[]
    loadUsers: () => void
    nextPage: number | null
}

const UserList = (props: Props) => {
    const {users, loadUsers, nextPage} = props

    const handleLoadPosts = (e: React.MouseEvent<HTMLElement>) => {
        loadUsers()
    }

    return (
       <div>
        
       </div>
    )
}

export default UserList