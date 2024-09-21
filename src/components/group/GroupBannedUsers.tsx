import React, { useEffect } from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { GetGroupUsersParams } from '../../types/group.types';
import { getBannedUsers } from '../../store/reducers/group.slice';
import UserList from '../user/UserList';
import { UserTop } from '../user/UserTop';
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GroupBannedUsers = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {bannedUsers, bannedNextPage, bannedPage, bannedPageSize} = useSelector((state: RootState) => state.group)

    const {groupId} = useParams()
    const {group} = useSelector((state: RootState) => state.group)
    const id = parseInt(groupId || "")

    useEffect(() => {
        if (Number.isNaN(id)) {
            return
        }

        const params: GetGroupUsersParams = {
            page: bannedPage,
            pageSize: bannedPageSize,
            groupId: id,
            setUsersEmpty: true
        }

        dispatch(getBannedUsers(params))
    }, [groupId])

    const handleLoadPosts = (e: React.MouseEvent<HTMLElement>) => {
        if (Number.isNaN(id) || !bannedNextPage) {
            return
        }

        const params: GetGroupUsersParams = {
            page: bannedNextPage,
            pageSize: bannedPageSize,
            groupId: id,
            setUsersEmpty: false
        }

        dispatch(getBannedUsers(params))
    }

    return (
        <div className='d-flex flex-column me-3'>
        {
            bannedUsers.map((ban, index) => (
                <div key={index.toString()}>
                    <div className={`d-flex flex-row align-items-center ${index != 0 ? "mt-3" : ""} justify-content-between`}>
                        <div className='d-flex flex-row align-items-center'>
                            <UserTop 
                                userId={ban.user.id} 
                                username={ban.user.username} 
                                pfp={ban.user.pfp ? ban.user.pfp.url : ""}
                                pfpLeft={true}
                                showVerified={true}
                                isVerified={ban.user.isVerified}
                            />

                            <div className='ms-3'>
                                <span className='user-info-framed text-white me-2'>Date: {(new Date(ban.bannedAt)).toDateString()}</span>
                                <span className='user-info-framed text-white'>Reason: {ban.reason}</span>
                            </div>
                        </div>
                        

                        <input type='button' value="Unban" className='btn btn-danger text-white'/>
                    </div>

                    <div className='hr mt-3'/>
                </div>
            ))
        }

        {
            bannedNextPage && (
                <button type='button' className='group-btn mt-3' onClick={handleLoadPosts}>
                    <FontAwesomeIcon icon={faArrowDownLong} />
                </button>
            )
        }
    </div>
    )
}

export default GroupBannedUsers