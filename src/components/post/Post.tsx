import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { GroupPost } from '../../types/group.types';
import "../../styles/post.css"
import PostTop from './PostTop';
import PostBody from './PostBody';
import PostTags from './PostTags';
import PostVote from './PostVote';
import PostItem from './PostItem';
import { faComment, faEye } from '@fortawesome/free-solid-svg-icons';

interface Props extends GroupPost {
    extraClass?: string
    type?: "suggest" | "published"
}

const Post = (props: Props) => {
    const {publisher, created_at, text, images, tags, extraClass, votes, views, comments, currentUserVote, type, id} = props

    return (
        <div className={`post d-flex flex-column ${extraClass}`}>
            {
                type == "suggest" ? (
                    <PostTop 
                        created_at={created_at} 
                        publisher={publisher} 
                        postId={id}
                        type={type}
                    />
                ) : (
                    <PostTop 
                        created_at={created_at} 
                        publisher={publisher} 
                    />
                )
            }
  

            <div className='hr my-3'/>

            <PostBody 
                text={text} 
                images={images}
            />

            <div className='hr my-3'/>

            <PostTags tags={tags} />

            <div className='hr my-3'/>

            {
                ((type && type == "published") || !type) && (
                    <div className='d-flex flex-row mb-3'>
                        <PostVote 
                            votes={votes}
                            currentUserVote={currentUserVote}
                            postId={id}
                        />
                        
                        <PostItem text={comments.toString()} icon={faComment} url="/" />

                        <PostItem text={views.toString()} icon={faEye} url="/" />
                    </div>
                )
            }
        </div>
    )
}

export default Post