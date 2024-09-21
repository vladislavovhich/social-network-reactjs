import React, { useEffect } from 'react';
import image from "../../images/default_group_pfp.jpg"
import "../../styles/no-items.css"

const NoItems = () => {
    return (
        <div className='NoItems d-flex flex-column'>
            <div className='d-flex flex-row align-items-center'>
                <img src={image} />
                <div className='d-flex flex-column ms-4'>
                    <div className='text-white h3'>Sorry, but there is no items</div>
                    <div className='text-gr-dark h2'>Try to get this one a bit later...</div>
                </div>
            </div>
        </div>
    )
}

export default NoItems