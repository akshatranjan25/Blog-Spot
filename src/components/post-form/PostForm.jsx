import React, {useCallback, useState} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import appwriteService from "../../appwrite/config";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({post}) {
    const [uploadError, setUploadError] = useState(null);
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const authStatus = useSelector((state) => state.auth.status)

    // Redirect if not authenticated
    React.useEffect(() => {
        if (!authStatus || !userData) {
            navigate('/login')
        }
    }, [authStatus, userData, navigate])

    const {register, handleSubmit, watch, setValue, getValues, control} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const submit = async (data) => {
        setUploadError(null);
        try {
            if (!authStatus || !userData?.$id) {
                setUploadError("You must be logged in to create a post");
                navigate('/login');
                return;
            }

            if (post) {
                let fileId = post.featuredImage;
                
                if (data.image && data.image[0]) {
                    const file = await appwriteService.uploadFile(data.image[0]);
                    if (!file) {
                        setUploadError("Failed to upload image");
                        return;
                    }
                    
                    if (post.featuredImage) {
                        await appwriteService.deleteFile(post.featuredImage);
                    }
                    fileId = file.$id;
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: fileId
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (!data.image || !data.image[0]) {
                    setUploadError("Please select an image");
                    return;
                }

                const file = await appwriteService.uploadFile(data.image[0]);
                if (!file) {
                    setUploadError("Failed to upload image");
                    return;
                }

                const fileId = file.$id;
                const dbPost = await appwriteService.createPost({
                    ...data,
                    featuredImage: fileId,
                    userId: userData.$id
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Error in submit:", error);
            setUploadError("An error occurred while saving the post");
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g, '-')
        }
        return ''
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === 'title'){
                setValue('slug', slugTransform(value.title, {shouldValidate: true}))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE 
                    label="Content :" 
                    name="content" 
                    control={control} 
                    defaultValue={post?.content || ''} 
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {uploadError && (
                    <p className="text-red-500 text-sm mb-4">{uploadError}</p>
                )}
                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg w-full h-auto"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm