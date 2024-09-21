import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { UserOne } from '../../types/user.types';
import { UserTop } from '../user/UserTop';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { publishPost } from '../../store/reducers/post.slice';

interface Props {
    created_at: string
    publisher: UserOne
    type?: "suggest" | "published"
    postId?: number
}

const PostTop = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>()

    const {created_at, publisher, type, postId} = props

    const createdAtDate = new Date(created_at)
    
    const dateSub = (+(new Date()) - +createdAtDate)

    let createdWhen = null
    let res = null

    if ((res = Math.round(dateSub / (86400 * 1000))) > 0) {
        createdWhen = `${res} day(s) ago`
    } else if ((res = Math.round(dateSub / (3600 * 1000))) > 0) {
        createdWhen = `${res} hour(s) ago`
    } else if ((res = Math.round(dateSub / (60 * 1000))) > 0) {
        createdWhen = `${res} minutes(s) ago`
    }

    const handlePublishPost = (e: React.MouseEvent<HTMLElement>) => {
        if (!postId) {
            return
        }

        dispatch(publishPost(postId))
    }

    return (
        <div className={`d-flex flex-row mt-3 ${type == "suggest" ? "justify-content-between" : ""}`}>
            <div className='d-flex flex-row align-items-center'>
                <UserTop 
                    username={publisher.username}
                    userId={publisher.id}
                    pfp={publisher.pfp ? publisher.pfp.url : null}
                    showVerified={true}
                    isVerified={publisher.isVerified}
                    pfpLeft={true}
                />

                <div className='text-white ms-2'>{createdWhen}</div>
            </div>

            {
                type == "suggest" && (
                   <input 
                        type="button" 
                        value="Publish"
                        className='btn btn-success ms-3 align-self-end'
                        onClick={handlePublishPost}
                   />
                )
            }
        </div>
    )
}

export default PostTop