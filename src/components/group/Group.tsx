import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { getGroup as getGroupThunk, getModerators as getModeratorsThunk, getRules as getRulesThunk } from '../../store/group-reducer';
import "../../styles/group-full.css"
import GroupTop from './GroupTop';
import GroupSidebar from './GroupSidebar';
import GroupPostFilter from './GroupPostFilter';
import PostList from '../post/PostList';

const Group = () => {
    const params = useParams<{groupId: string}>()
    const groupId = parseInt(params.groupId || "")

    const {group, moderators, rules, posts, postsNextPage} = useSelector((state: RootState) => state.group)
    const {postDateBy, postSortBy, postsPage, postsPageSize} = useSelector((state: RootState) => state.group)

    const user = useSelector((state: RootState) => state.auth.user)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const hasGroup = !group || (group && group.id != groupId)

        if (!group) {
            dispatch(getGroupThunk(groupId))
        }

        if (!moderators) {
            dispatch(getModeratorsThunk(groupId))
        }

        if (!rules) {
            dispatch(getRulesThunk(groupId))
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
                    />

                    <div className='hr mt-3'/>

                    <div className='d-flex flex-column mt-3'>
                        <GroupPostFilter groupId={group.id}/>
                        <PostList 
                            posts={posts} 
                            nextPage={postsNextPage}
                            pageSize={postsPageSize}
                            dateBy={postDateBy ? postDateBy : "today"}
                            sortBy={postSortBy ? postSortBy : "now"}
                            groupId={group.id}
                        />
                    </div>

                    <div className='hr mt-4'/>
                    
                </div>
            </>
        ) : null
    )
}

export default Group