import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import FormHeader from '../auth/FormHeader';
import FormField from '../auth/FormField';

import FormTextArea from '../auth/FormTextArea';
import FormTagField from '../auth/FormTagField';
import FormFileField from '../auth/FormFileField';
import { setGroupCategory, addGroupCategory, removeGroupCategory, setGroupName, setGroupDescription, setRuleHeader, setRuleBody, addRule, removeRule, setCommonError, createGroup } from '../../store/reducers/group-create.slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CreateGroup } from '../../types/group.types';
import { Spinner } from 'react-bootstrap';

const FormSchema = Yup.object({
    groupName: Yup.string().min(3).required(),
    groupDescription: Yup.string().min(5).required(),
    groupCategory: Yup.string().min(1).required(),
    groupRuleHeader: Yup.string().min(5).required(),
    groupRuleBody: Yup.string().min(5).required()
})

interface IForm {
    groupName: string,
    groupDescription: string,
    groupCategory: string,
    groupRuleHeader: string,
    groupRuleBody: string
}
    
const GroupEdit = () => {
    const {
        groupName, groupCategories, groupDescription, groupCategory, 
        groupRules, groupRuleBody, groupRuleHeader, commonError
    } = useSelector((state: RootState) => state.groupCreate)
    const {fileOne} = useSelector((state: RootState) => state.file)
    const {status} = useSelector((state: RootState) => state.groupCreate.createGroup)

    const dispatch = useDispatch<AppDispatch>()

    const { register, handleSubmit, formState: { errors }, reset, clearErrors, trigger } = useForm<IForm>({
        resolver: yupResolver(FormSchema),
        defaultValues: {groupName, groupDescription, groupCategory: "", groupRuleBody, groupRuleHeader}
    });

    const setCategoryText = (value: string) => {
        clearErrors("groupCategory")
        dispatch(setGroupCategory(value))
    }

    const addCategory = (value: string) => {
        dispatch(addGroupCategory(value))
    }

    const removeCategory = (value: string) => {
        dispatch(removeGroupCategory(value))
    }

    const triggerCategory = () => trigger("groupCategory")

    const handleGroupAction = async (e: React.MouseEvent<HTMLElement>) => {
        const isNameCorrect = await trigger("groupName")
        const isDescriptionCorrect = await trigger("groupDescription")

        if (!isNameCorrect || !isDescriptionCorrect) {
            return
        }

        if (!groupRules.length) {
            dispatch(setCommonError("You should add at least one rule for group."))

            return
        }

        if (!groupCategories.length) {
            dispatch(setCommonError("You should add at least one category for group."))

            return
        }

        const data: CreateGroup = {
            name: groupName,
            description: groupDescription,
            categories: groupCategories,
            rules: groupRules,
        }

        if (fileOne) {
            const res = await fetch(fileOne)
            const blob = await res.blob()

            data.file = blob
        }

        dispatch(createGroup(data))
    }

    const handleAddRule = async (e: React.MouseEvent<HTMLElement>) => {
        const isHeaderCorrect = await trigger("groupRuleHeader")
        const isBodyCorrect = await trigger("groupRuleBody")

        if (!isHeaderCorrect || !isBodyCorrect) {
            return
        }

        dispatch(addRule({
            header: groupRuleHeader,
            body: groupRuleBody
        }))

        dispatch(setRuleBody(""))
        dispatch(setRuleHeader(""))
    }

    return (    
        <div className='d-flex flex-column'>

            <div className='d-flex flex-row'>
                <div className='d-flex flex-column w-50'>
                    <FormHeader 
                        text='Group info' 
                        spacing='my-2'
                        width='w-100'
                    />

                    <FormFileField text="Group picture" extraClass='w-100'/>

                    <FormField 
                        type='text'
                        register={register("groupName")}
                        value={groupName}
                        placeholder='Enter group name'
                        error={errors.groupName}
                        id='groupName'
                        action={setGroupName}
                        labelText='Group name'
                        clearError={clearErrors}
                        extraClass='mt-3 w-100'
                    />

                    <FormTextArea 
                        register={register("groupDescription")}
                        value={groupDescription}
                        placeholder='Enter group description'
                        error={errors.groupDescription}
                        id='groupDescription'
                        action={setGroupDescription}
                        labelText='Group description text'
                        clearError={clearErrors}
                        extraClass='mt-2 w-100'
                    />

                    <FormTagField 
                        register={register("groupCategory")}
                        value={groupCategory}
                        tags={groupCategories}
                        setTagText={setCategoryText}
                        addTag={addCategory}
                        removeTag={removeCategory}
                        clearError={clearErrors}
                        text="Group category"
                        error={errors.groupCategory}
                        trigger={triggerCategory}
                        extraClass="w-100"
                        itemsText='Categories'
                    />

                    {
                        status == "pending" ? (
                            <Spinner animation="border" variant='info' />
                        ) : (
                            <input type='button' value="Create group" className='btn btn-info w-100 mt-3' onClick={handleGroupAction}/>
                        )
                    }

                    {
                        commonError && (
                            <span className='text-danger my-1'>{commonError}</span>
                        )
                    }
                </div>
                <div className='d-flex flex-column w-50 ms-3'>
                    <FormHeader 
                        text='Group rules' 
                        spacing='my-2'
                        width='w-100'
                    />
                    <div className='d-flex flex-column'>
                        <FormField 
                            type='text'
                            register={register("groupRuleHeader")}
                            value={groupRuleHeader}
                            placeholder='Enter title'
                            error={errors.groupRuleHeader}
                            id='groupRuleHeader'
                            extraClass='mt-1 w-100'
                            action={setRuleHeader}
                            labelText='Title'
                            clearError={clearErrors}
                        />

                        <FormTextArea 
                            register={register("groupRuleBody")}
                            value={groupRuleBody}
                            placeholder='Enter description'
                            error={errors.groupRuleBody}
                            id='groupRuleBody'
                            action={setRuleBody}
                            labelText='Enter description'
                            clearError={clearErrors}
                            extraClass='mt-2 w-100'
                        />

                        <input type='button' value="Add rule" className='btn btn-info mt-3' onClick={handleAddRule}/>
                    </div>

                    {
                        !!groupRules.length && (
                            <>
                                <FormHeader 
                                    text='Rules' 
                                    spacing='my-2'
                                    width='w-100'
                                />
                                {
                                    groupRules.map((rule, index) => {
                                        const handleRuleDelete = (e: React.MouseEvent) => {
                                            dispatch(removeRule(index))
                                        }

                                        return (
                                            <div key={index.toString()}>
                                                <div className={`${index != 0 && "mt-2"}`}>
                                                    <div className='d-flex flex-row align-items-center justify-content-between mt-2'>
                                                        <div className='text-white '>№{rule.order}. {rule.header}</div>
                                                        <button 
                                                            type='button' 
                                                            className='btn btn-danger d-flex flex-row align-items-center'
                                                            onClick={handleRuleDelete}
                                                        >
                                                            <div>Remove</div>
                                                            <FontAwesomeIcon icon={faXmark} className='ms-1 mt-1'/>
                                                        </button>
                                                    </div>
                                                    
                                                    <div className='hr mt-3'/>

                                                    <div className='text-gr-dark my-2'>{rule.body}</div>
                                                </div>

                                                {index != groupRules.length - 1 && <div className='hr mt-3'/>}
                                            </div>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default GroupEdit