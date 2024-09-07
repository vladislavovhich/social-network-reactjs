import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { GroupFull, GroupRule } from '../../types/group.types';
import { UserOne } from '../../types/user.types';
import GroupAdmin from './GroupAdmin';
import GroupCategories from './GroupCategories';
import GroupDescription from './GroupDescription';
import GroupInfo from './GroupInfo';
import GroupModerators from './GroupModerators';
import GroupRules from './GroupRules';

interface Props {
    group: GroupFull
    moderators: UserOne[]
    rules: GroupRule[]
}

const GroupSidebar = (props: Props) => {
    const {group, moderators, rules} = props

    const groupDate = new Date(group?.created_at || "")

    return (
        <div className='sidebar d-flex flex-column'>
            <GroupDescription text={group.description} />
            
            <div className='hr my-3'/>
            
            <GroupInfo 
                subs={group.totalSubs} 
                created={groupDate.toDateString()}
            />

            <div className='hr my-3'/>
            
            <GroupCategories categories={group.categories}/>

            <div className='hr my-3'/>

            <GroupRules rules={rules}/>
            
            <div className='hr my-3'/>

            <GroupAdmin group={group} />
            
            <div className='hr my-3'/>

            <GroupModerators moderators={moderators} />
            
            <div className='hr my-3'/>
        </div>
    )
}

export default GroupSidebar