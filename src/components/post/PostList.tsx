import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { GroupPost, SearchPostsThunkParams } from '../../types/group.types';
import Post from './Post';
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    posts: GroupPost[]
    nextPage: number | null
    pageSize: number
    groupId: number
    extraClass?: string
    type?: "suggest" | "published"
    loadPostsFunc: () => void
}

const PostList = (props: Props) => {
    const {posts, nextPage, loadPostsFunc, extraClass, type} = props

    const loadPosts = (e: React.MouseEvent<HTMLElement>) => {
       loadPostsFunc()
    }

    return (
        <div className={`d-flex flex-column ${extraClass}`}>
            {
                posts.map((post, index) => (
                    <Post 
                        {...post} 
                        key={index.toString()} 
                        type={type}
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