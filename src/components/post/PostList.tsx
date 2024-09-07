import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { GroupPost, SearchPostsThunkParams } from '../../types/group.types';
import Post from './Post';
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPosts as getPostsThunk } from '../../store/group-reducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

interface Props {
    posts: GroupPost[]
    nextPage: number | null
    pageSize: number
    sortBy: string
    dateBy: string
    groupId: number
}

const PostList = (props: Props) => {
    const {posts, nextPage, pageSize, sortBy, dateBy, groupId} = props
    const dispatch = useDispatch<AppDispatch>()

    const loadPosts = (e: React.MouseEvent<HTMLElement>) => {
        if (!nextPage) {
            return
        }

        const params: SearchPostsThunkParams = {
            params: {
                page: nextPage,
                pageSize: pageSize,
                date: dateBy,
                post: sortBy
            },
            groupId
        }

        dispatch(getPostsThunk(params))
    }

    return (
        <div className='d-flex flex-column'>
            {
                posts.map((post, index) => (
                    <Post 
                        {...post} 
                        key={index.toString()} 
                        extraClass={"mt-3"}
                    />
                ))
            }

            {
                nextPage && (
                    <button type='button' className='group-btn mt-3' onClick={loadPosts}>
                        <FontAwesomeIcon icon={faArrowDownLong} />
                    </button>
                )
            }
        </div>
    )
}

export default PostList