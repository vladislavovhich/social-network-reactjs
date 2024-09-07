import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { GroupPost } from '../../types/group.types';
import { UserTop } from '../user/UserTop';
import "../../styles/post.css"
import { Link } from 'react-router-dom';
import { faArrowDown, faArrowDownLong, faArrowUp, faComment, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props extends GroupPost {
    extraClass?: string
}

const Post = (props: Props) => {
    const {publisher, created_at, text, images, tags, extraClass, votes, views, comments} = props

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

    return (
        <div className={`post d-flex flex-column ${extraClass}`}>
            <div className='d-flex flex-row align-items-center mt-4'>
                <UserTop 
                    username={publisher.username}
                    userId={publisher.id}
                    pfp={publisher.pfp ? publisher.pfp.url : null}
                    showVerified={true}
                    isVerified={publisher.isVerified}
                    pfpLeft={true}
                />

                <div className='text-white ms-3'>{createdWhen}</div>
            </div>

            <div className='hr my-3'/>

            <div className='d-flex flex-column'>
                <div className='text-white'>{text}</div>
                {
                    images.length != 0 && (
                        <div className='d-flex flex-row my-3'>
                            {
                                images.map((image, index) => (
                                    <div key={index.toString()}>
                                        <img src={image.url} className='post-image'/>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>

            <div className='hr my-3'/>

            <div className='d-flex flex-row'>
                {
                    tags.map((tag, index) => (
                        <div key={index.toString()} className={`user-info-framed text-white ${index != 0 && "ms-2"}`}>
                            <span className='me-1'>#</span>
                            {tag.name}
                        </div>
                    ))
                }
            </div>

            <div className='hr my-3'/>

            <div className='d-flex flex-row mb-3'>
                <div className='d-flex flex-row user-info-framed align-items-center'>
                    <Link to="/" className='me-2 text-white'>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </Link> 

                    <div className='text-white'>{votes}</div>

                    <Link to="/" className='ms-2 text-white'>
                        <FontAwesomeIcon icon={faArrowDown} />
                    </Link>
                </div>
                <div className='ms-2 d-flex flex-row user-info-framed align-items-center'>
                    <Link to="/" className='text-white d-flex flex-row align-items-center text-decoration-none'>
                        <FontAwesomeIcon icon={faComment} className='text-white me-2'/>
                        <div className='text-white'>{comments}</div>
                    </Link>
                </div>
                <div className='ms-2 d-flex flex-row user-info-framed align-items-center'>
                    <FontAwesomeIcon icon={faEye} className='text-white me-2'/>
                    <div className='text-white'>{views}</div>
                </div>
            </div>
        </div>
    )
}

export default Post