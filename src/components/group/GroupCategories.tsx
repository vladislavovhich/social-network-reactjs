import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Category } from '../../types/group.types';

interface Props {
    categories: Category[]
}

const GroupCategories = (props: Props) => {
    return (
        <div className='d-flex flex-column'>
            <div className='text-white me-2 mb-2 h5'>Categories</div>
            <div className='d-flex flex-row'>
                {
                    props.categories.map((category, index) => (
                        <div key={index.toString()} className={`user-info-framed  text-white ${index != 0 && "ms-2"}`}>
                            <span className='me-1'>#</span>
                            {category.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GroupCategories