import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { votePost } from '../../store/reducers/post.slice';

interface Props {
    votes: number
    currentUserVote: number | null
    postId: number
}

const PostVote = (props: Props) => {
    const {votes, currentUserVote, postId} = props

    const dispatch = useDispatch<AppDispatch>()

    const handleUpvotePost = (e: React.MouseEvent<HTMLElement>) => {
        if (currentUserVote == 1) {
            return
        }

        dispatch(votePost({postId, value: 1}))
    }

    const handleDownvotePost = (e: React.MouseEvent<HTMLElement>) => {
        if (currentUserVote == -1) {
            return
        }

        dispatch(votePost({postId, value: -1}))
    }

    return (
        <div className='d-flex flex-row user-info-framed align-items-center'>
            {
                currentUserVote && currentUserVote == 1 ? (
                    <a className='me-2 text-danger' onClick={handleUpvotePost}>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </a> 
                ) : (
                    <a className='me-2 text-white' onClick={handleUpvotePost}>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </a> 
                )
            }

            {
                currentUserVote ? (
                    <div className='text-danger'>{votes}</div>
                ) : (
                    <div className='text-white'>{votes}</div>
                )
            }

            {
                currentUserVote && currentUserVote == -1 ? (
                    <a className='ms-2 text-danger' onClick={handleDownvotePost}>
                        <FontAwesomeIcon icon={faArrowDown}/>
                    </a>
                ) : (
                    <a className='ms-2 text-white' onClick={handleDownvotePost}>
                        <FontAwesomeIcon icon={faArrowDown} />
                    </a>
                )
            }
        </div>
    )
}

export default PostVote