import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Tag } from '../../types/group.types';

interface Props {
    tags: Tag[]
}

const PostTags = (props: Props) => {
    const {tags} = props
    
    return (
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
    )
}

export default PostTags