import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';import FormField from '../auth/FormField';
import FormHeader from '../auth/FormHeader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import FormTextArea from '../auth/FormTextArea';
import FormFileManyField from '../auth/FormFileManyField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import "../../styles/post-create.css"
import { CreatePost } from '../../types/group.types';
import { redirect, useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { setPostTagText, addPostTag, createPost, setPostText, removePostTag } from '../../store/reducers/post-create.slice';
import FormTagField from '../auth/FormTagField';

const FormSchema = Yup.object({
    postText: Yup.string().min(1, "Post text shouldn't pe empty").required("Post text shouldn't pe empty"),
    postTagText: Yup.string().min(1, "Tag text shouldn't be empty").required("Tag text shouldn't be empty"),
})

interface IForm {
    postText: string,
    postTagText: string
}
    
    
const PostCreate = () => {
    const {groupId} = useParams()
    const id = parseInt(groupId || "")

    const dispatch = useDispatch<AppDispatch>()
    const {postText, postTags, postTagText} = useSelector((state: RootState) => state.postCreate)
    const {status} = useSelector((state: RootState) => state.postCreate.createPost)
    const {fileMany} = useSelector((state: RootState) => state.file)
    
    const { register, handleSubmit, formState: { errors }, reset, clearErrors, trigger } = useForm<IForm>({
        resolver: yupResolver(FormSchema),
        defaultValues: {postText: "", postTagText: ""}
    });

    const handlePostCreate = async (e: React.MouseEvent<HTMLElement>) => {
        const result = await trigger("postText")

        if (!result || Number.isNaN(id)) {
            return
        }

        const data: CreatePost = {
            files: fileMany.map(item => item.file),
            tags: postTags,
            text: postText,
            groupId: id
        }

        dispatch(createPost(data))
    }

    const setTagText = (value: string) => {
        clearErrors("postTagText")
        dispatch(setPostTagText(value))
    }

    const addTag = (value: string) => {
        dispatch(addPostTag(value))
    }

    const removeTag = (value: string) => {
        dispatch(removePostTag(value))
    }

    const triggerTag = () => trigger("postTagText")

    return (
        <div className='d-flex flex-column me-3'>
            <FormHeader 
                text='Create your post' 
                spacing='my-2'
                width='w-100'
            />

            <FormTextArea 
                register={register("postText")}
                value={postText}
                placeholder='Enter text'
                error={errors.postText}
                id='postText'
                action={setPostText}
                labelText='Post text'
                clearError={clearErrors}
            />
            
            <div className='form-group'>
                <FormTagField 
                    register={register("postTagText")}
                    value={postTagText}
                    tags={postTags}
                    setTagText={setTagText}
                    addTag={addTag}
                    removeTag={removeTag}
                    clearError={clearErrors}
                    text="Post tags"
                    error={errors.postTagText}
                    trigger={triggerTag}
                    extraClass="w-100"
                    itemsText='Tags'
                />

                {errors.postTagText && <span className='text-danger my-1'>{errors.postTagText.message}</span>}
            </div>
            
            {
                status == "pending" ? (
                    <Spinner animation="border" variant='info' />
                ) : (
                    <input type='button' value="Suggest post" className='btn btn-info mt-3 w-100' onClick={handlePostCreate}/>
                )
            }

            <FormFileManyField />
        </div>
    )
}

export default PostCreate