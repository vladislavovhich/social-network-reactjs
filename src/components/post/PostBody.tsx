import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Image } from '../../types/group.types';

interface Props {
    text: string
    images: Image[]
}

const PostBody = (props: Props) => {
    const {text, images} = props

    return (
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
    )
}

export default PostBody