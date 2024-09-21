import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, redirect, Route, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { getGroup, getRules } from '../../store/reducers/group.slice';
import "../../styles/group-full.css"
import GroupTop from './GroupTop';
import GroupSidebar from './GroupSidebar';
import { getModerators } from '../../store/reducers/moderator.slice';

const Group = () => {
    const params = useParams<{groupId: string}>()
    const groupId = parseInt(params.groupId || "")

    const {group, rules} = useSelector((state: RootState) => state.group)
    const {moderators} = useSelector((state: RootState) => state.moderator)

    const user = useSelector((state: RootState) => state.auth.user)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if ((!Number.isNaN(groupId) && group && group.id != groupId) || (!Number.isNaN(groupId) && !group)) {
            dispatch(getGroup(groupId))
            dispatch(getModerators(groupId))
            dispatch(getRules(groupId))
        }

    }, [group, moderators, rules])

    return (
        group ? (
            <>
                <div className='d-flex flex-column'>
                    <GroupTop 
                        id={group.id}
                        name={group.name}
                        isSubbed={user ? user.groups.some(gr => gr.id == group.id) : false}
                        pfp={group.pfp ? group.pfp.url : ""}
                        isAuthorized={!!user}
                        admin={group.admin}
                    />

                    <div className='hr mt-3'/>

                    <div className='d-flex flex-row'>
                        <div className='d-flex flex-column mt-3 flex-grow-1'>
                            <Outlet />
                        </div>

                        <GroupSidebar 
                            group={group}
                            moderators={moderators ? moderators : []}
                            rules={rules ? rules : []}
                        />
                    </div>

                    <div className='hr mt-4'/>
                    
                </div>
            </>
        ) : null
    )
}

export default Group