import React, {useState, useEffect} from 'react'
import { Container, PostCard, PostForm } from '../components'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

function EditPost() {
    const [post, setPost] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
                setIsLoading(false)
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    if (isLoading) {
        return (
            <motion.div 
                className='w-full py-8 mt-4 text-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Container>
                    <motion.div 
                        className='flex flex-wrap justify-center'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="p-2 w-full">
                            <h1 className='text-2xl font-bold text-blue-800'>
                                Loading post...
                            </h1>
                        </div>
                    </motion.div>
                </Container>
            </motion.div>
        )
    }

    return post ? (
        <motion.div 
            className='py-8 bg-gradient-to-b from-blue-50 to-white min-h-screen'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Container>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
                        Edit Post
                    </h1>
                    <PostForm post={post}/>
                </motion.div>
            </Container>
        </motion.div>
    ) : null 
}

export default EditPost