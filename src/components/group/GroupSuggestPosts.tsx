import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSuggestPosts } from '../../store/reducers/post.slice';
import { AppDispatch, RootState } from '../../store/store';
import { GroupSuggestPostsParams, PaginationParams, SearchPostsThunkParams } from '../../types/group.types';
import PostList from '../post/PostList';

const GroupSuggestPosts = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {group} = useSelector((state: RootState) => state.group)
    const {suggestPostsPage, suggestPostsPageSize, suggestPostsNextPage, suggestPosts} = useSelector((state: RootState) => state.post)
    const {groupId} = useParams()
    const id = parseInt(groupId || "")

    useEffect(() => {
        if (Number.isNaN(id)) {
            return
        }

        const params: GroupSuggestPostsParams = {
            page: suggestPostsPage,
            pageSize: suggestPostsPageSize,
            groupId: id,
            setPostsEmpty: true
        }

        dispatch(getSuggestPosts(params))
    }, [groupId])
    
    const loadPostsFunc = () => {
        if (!suggestPostsNextPage) {
            return
        }

        const params: GroupSuggestPostsParams = {
            page: suggestPostsNextPage,
            pageSize: suggestPostsPageSize,
            groupId: id,
            setPostsEmpty: false
        }

        dispatch(getSuggestPosts(params))
    }

    return (
        <>
            <PostList 
                posts={suggestPosts} 
                nextPage={suggestPostsNextPage}
                pageSize={suggestPostsPageSize}
                type="suggest"
                groupId={id}
                extraClass='me-4'
                loadPostsFunc={loadPostsFunc}
            />
        </>
    )
}

export default GroupSuggestPosts