import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { getPosts } from '../../store/reducers/post.slice';
import { SearchPostsThunkParams } from '../../types/group.types';
import PostList from '../post/PostList';
import GroupPostFilter from './GroupPostFilter';

const GroupPosts = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {postsPage, postsPageSize, postDateBy, postSortBy, posts, postsNextPage} = useSelector((state: RootState) => state.post)
    const {group} = useSelector((state: RootState) => state.group)
    const {groupId} = useParams()
    const id = parseInt(groupId || "")

    useEffect(() => {
        if (Number.isNaN(id)) {
            return
        }
        
        const params: SearchPostsThunkParams = {
            params: {
                page: postsPage,
                pageSize: postsPageSize,
                date: postDateBy ? postDateBy : "week",
                post: postSortBy ? postSortBy : "now"
            },
            groupId: id,
            setPostsEmpty: true
        }
        
        dispatch(getPosts(params))
    }, [groupId])

    const loadPostsFunc = () => {
        if (!postsNextPage) {
            return
        }

        const params: SearchPostsThunkParams = {
            params: {
                page: postsNextPage,
                pageSize: postsPageSize,
                date: postDateBy ? postDateBy : "week",
                post: postSortBy ? postSortBy : "now"
            },
            groupId: id
        }

        dispatch(getPosts(params))
    }

    return (
        <>
            <GroupPostFilter groupId={id}/>

            <PostList 
                posts={posts} 
                nextPage={postsNextPage}
                pageSize={postsPageSize}
                groupId={id}
                extraClass='me-4'
                loadPostsFunc={loadPostsFunc}
            />
        </>
    )
}

export default GroupPosts