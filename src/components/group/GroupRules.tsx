import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { GroupRule } from '../../types/group.types';
import Accordion from 'react-bootstrap/Accordion';

interface Props {
    rules: GroupRule[]
}

const GroupRules = (props: Props) => {
    const {rules} = props

    return (
        <div className='d-flex flex-column'>
            <div className='text-white me-2 h5'>Rules</div>

            <div className='d-flex flex-column'>
                {
                    rules.map((rule, index) => (
                        <div className={`${index != 0 && "mt-2"}`} key={index.toString()}>
                            <div className='text-white '>{rule.order} {rule.title}</div>
                            <div className='text-gr-dark'>{rule.text}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GroupRules