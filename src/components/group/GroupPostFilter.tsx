import React, { ChangeEvent, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setPosts, setPostsDateBy, setPostsSortBy } from '../../store/group-reducer';
import { getPosts as getPostsThunk } from '../../store/group-reducer';
import { group } from 'console';
import { SearchPostsThunkParams } from '../../types/group.types';

interface Props {
    groupId: number
}

const GroupPostFilter = (props: Props) => {
    const {groupId} = props

    const {postDateBy, postSortBy, postsPage, postsPageSize} = useSelector((state: RootState) => state.group)

    const dispatch = useDispatch<AppDispatch>()

    const handleDateOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPostsDateBy(e.target.value))
    }

    const handleSortOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPostsSortBy(e.target.value))
    }

    const handleSearchOnClick = (e: React.MouseEvent<HTMLElement>) => {
        const params: SearchPostsThunkParams = {
            params: {
                page: postsPage,
                pageSize: postsPageSize,
                date: postDateBy ? postDateBy : "today",
                post: postSortBy ? postSortBy : "now"
            },
            groupId: groupId,
            setPostsEmpty: true
        }

        dispatch(getPostsThunk(params))
    }

    return (
        <div className='row'>
            <div className='d-flex flex-row'>
                <form className='d-flex flex-row flex-grow-1'>
                    <div className='form-group col-3'>
                        <label htmlFor="sort-by-select" className='text-white mb-1'>Sort by</label>

                        <select 
                            className='form-select' 
                            data-bs-theme="dark"  
                            id='sort-by-select' 
                            onChange={handleSortOnChange} 
                            value={postSortBy ? postSortBy : "now"}
                        >
                            <option value="popular">Popular</option>
                            <option value="controversial">Controversial</option>
                            <option value="hot">Hot</option>
                            <option value="now">Now</option>
                        </select>
                    </div>

                    <div className='form-group col-3 ps-3'>
                        <label htmlFor="date-by-select" className='text-white mb-1'>By date</label>
                        <select 
                            className='form-select' 
                            data-bs-theme="dark" 
                            id='date-by-select' 
                            onChange={handleDateOnChange}
                            value={postDateBy ? postDateBy : "week"}
                        >
                            <option value="year">Year</option>
                            <option value="month">Month</option>
                            <option value="week">Week</option>
                            <option value="today">Today</option>
                        </select>
                    </div>

                    <input 
                        type='button' 
                        className='group-btn mt-4 ms-3' 
                        value="Search"
                        onClick={handleSearchOnClick}
                    />
                </form>
            </div>
        </div>
    )
}

export default GroupPostFilter