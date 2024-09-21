import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import GroupOne from './GroupOne';
import { Link, useParams } from 'react-router-dom';
import { setUser, getUser } from '../../store/reducers/user.slice';
import NoItems from '../common/NoItems';

const GroupList = () => {
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

    const groups = user.groups

    return (
        <div>
            {
                groups.length == 0 ? (
                    <>
                        <NoItems />
                        <Link className='btn btn-info mt-3' to="/group-create">Create group</Link>
                    </>
                ) : (
                    groups.map((group, index) => 
                        <div key={index.toString()} className='mt-3'>
                            <GroupOne 
                                id={group.id} 
                                name={group.name} 
                                pfp={group.pfp}
                            />

                            {index <= groups.length && <div className='hr mt-3'/>}
                        </div> 
                    )
                )
            }
        </div>
    )
}

export default GroupList