import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import GroupOne from './GroupOne';

const GroupList = () => {
    const groups = useSelector((state: RootState) => state.auth.user ? state.auth.user.groups : [])

    return (
        <div>
            {
                groups.map((group, index) => 
                    <>
                        <GroupOne 
                            id={group.id} 
                            name={group.name} 
                            pfp={group.pfp}
                            key={index.toString()}
                        />

                        {index <= groups.length && <div className='hr mt-3'/>}
                    </> 
                )
            }
        </div>
    )
}

export default GroupList