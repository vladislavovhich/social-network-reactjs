import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { getGroup as getGroupThunk, getModerators as getModeratorsThunk, getRules as getRulesThunk } from '../../store/group-reducer';
import { setNotFoundError } from '../../store/common-reducer';
import image from "../../images/default_group_pfp.jpg"
import "../../styles/group-full.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faPlus, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { UserTop } from '../user/UserTop';

const Group = () => {
    const params = useParams<{groupId: string}>()

    const groupId = parseInt(params.groupId || "")

    const user = useSelector((state: RootState) => state.auth.user)
    const group = useSelector((state: RootState) => state.group.group)
    const dispatch = useDispatch<AppDispatch>()

    const moderators = useSelector((state: RootState) => state.group.moderators)
    const rules = useSelector((state: RootState) => state.group.rules) 

    useEffect(() => {
        const hasGroup = !group || (group && group.id != groupId)

        if (!group) {
            dispatch(getGroupThunk(groupId))
        }

        if (!moderators) {
            dispatch(getModeratorsThunk(groupId))
        }

        if (!rules) {
            dispatch(getRulesThunk(groupId))
        }

    }, [group, moderators, rules])

    const groupDate = new Date(group?.created_at || "")

    return (
        group ? (
            <div className='d-flex flex-column'>
                <div>
                    <div className='d-flex flex-row align-items-center justify-content-between'>
                        <div className='d-flex flex-row align-items-center'>
                            {
                                group.pfp ? (
                                    <img src={group.pfp.url} alt="pfp" className='group-pfp'/>
                                ) : (
                                    <img src={image} alt="pfp" className='group-pfp'/>
                                )
                            }

                            <h2 className='text-white h2 ms-3'>{group.name}</h2>
                        </div>
                        <div>
                            <Link to='/groups/:groupId/create-post' className='group-link'>
                                <FontAwesomeIcon icon={faPlus} className='me-2'/>
                                <span>Create post</span>
                            </Link>
                            {
                                user && user.groups.some(gr => gr.id == groupId) ? (
                                    <Link to='/groups/:groupId/leave' className='group-link ms-2'>
                                        <FontAwesomeIcon icon={faDoorOpen} className='me-2' />
                                        <span>Leave</span>
                                    </Link>
                                ) : (
                                    <Link to='/groups/:groupId/join' className='group-link ms-2'>
                                        <FontAwesomeIcon icon={faRightToBracket} className='me-2' />
                                        <span>Join</span>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className='hr mt-3'/>
                

                <div className='sidebar d-flex flex-column'>
                    <div className='my-3 d-flex flex-column'>
                        <div className='text-white me-2 mb-2 h5'>Description</div>
                        <span className='text-gr-dark'>{group.description}</span>
                    </div>
                    
                    <div className='hr my-3'/>
                    
                    <div className='d-flex flex-row justify-content-center'>
                        <div className='d-flex flex-column align-items-center'>
                            <div className='text-white font-weight-bold'>{group.totalSubs}</div>
                            <div className='text-gr-dark'>Member(s)</div>
                        </div>
                        <div className='d-flex flex-column align-items-center ms-3'>
                            <div className='text-white font-weight-bold'>{groupDate.toDateString()}</div>
                            <div className='text-gr-dark'>Created at</div>
                        </div>
                    </div>

                    <div className='hr my-3'/>
                   
                    <div className='d-flex flex-column'>
                        <div className='text-white me-2 mb-2 h5'>Categories</div>
                        <div className='d-flex flex-row'>
                            {
                                group.categories.map((category, index) => (
                                    <div key={index.toString()} className={`user-info-framed ${index != 0 && "ms-2"}`}>
                                        <span className='me-1'>#</span>
                                        {category.name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className='hr my-3'/>

                    <div className='d-flex flex-column'>
                        <div className='text-white me-2 mb-2 h5'>Rules</div>
                        <div className='d-flex flex-row'>
                            {
                                rules && (
                                    rules.map((rule, index) => (
                                        <div className={`text-white ${index != 1 && "mt-2"}`} key={index.toString()}>
                                            {rule.order} {rule.title} {rule.text}
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                    
                    <div className='hr my-3'/>

                    <div className='d-flex flex-column'>
                        <div className='text-white me-2 mb-2 h5'>Admin</div>
                        <UserTop 
                            userId={group.admin.id} 
                            username={group.admin.username} 
                            pfp={group.admin.pfp ? group.admin.pfp.url : ""}
                            pfpLeft={true}
                            showVerified={true}
                            isVerified={group.admin.isVerified}
                        />
                    </div>
                    
                    <div className='hr my-3'/>

                    <div className='d-flex flex-column'>
                        <div className='text-white me-2 mb-2 h5'>Moderators</div>

                        {
                            moderators && (
                                moderators.map((mod, index) => (
                                    <UserTop 
                                        userId={mod.id} 
                                        username={mod.username} 
                                        pfp={mod.pfp ? mod.pfp.url : ""}
                                        pfpLeft={true}
                                        showVerified={true}
                                        isVerified={mod.isVerified}
                                        key={index.toString()}
                                        extraClass={index != 0 ? "mt-3" : ""}
                                    />
                                ))
                            )
                        }
                    </div>
                    
                    <div className='hr my-3'/>
                </div>
            </div>
        ) : null
    )
}

export default Group