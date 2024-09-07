import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { GroupFull } from '../../types/group.types';
import { UserTop } from '../user/UserTop';

interface Props {
    group: GroupFull
}

const GroupAdmin = (props: Props) => {
    const {group} = props

    return (
        <div className='d-flex flex-column'>
            <div className='text-white me-2 mb-2 h5'>Admin</div>
            <UserTop 
                userId={group.admin.id} 
                username={group.admin.username} 
                pfp={group.admin.pfp ? group.admin.pfp.url : ""}
                pfpLeft={true}
                showVerified={true}
                isVerified={group.admin.isVerified}
            />
        </div>
    )
}

export default GroupAdmin