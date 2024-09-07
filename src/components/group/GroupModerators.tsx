import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { UserOne } from '../../types/user.types';
import { UserTop } from '../user/UserTop';

interface Props {
    moderators: UserOne[]
}

const GroupModerators = (props: Props) => {
    const {moderators} = props

    return (
        <div className='d-flex flex-column'>
            <div className='text-white me-2 mb-2 h5'>Moderators</div>
            {
                moderators.map((mod, index) => (
                    <UserTop 
                        userId={mod.id} 
                        username={mod.username} 
                        pfp={mod.pfp ? mod.pfp.url : ""}
                        pfpLeft={true}
                        showVerified={true}
                        isVerified={mod.isVerified}
                        key={index.toString()}
                        extraClass={index != 0 ? "mt-3" : ""}
                    />
                ))
            }
        </div>
    )
}

export default GroupModerators