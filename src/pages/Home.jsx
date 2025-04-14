import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <motion.div 
                        className='flex flex-wrap justify-center'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="p-2 w-full">
                            <h1 className='text-2xl font-bold text-blue-800'>
                                Loading posts...
                            </h1>
                        </div>
                    </motion.div>
                </Container>
            </div>
        )
    }

    if (!authStatus) {
        return (
            <motion.div 
                className='w-full py-8 mt-4 text-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Container>
                    <motion.div 
                        className='flex flex-col items-center justify-center space-y-6'
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h1 className='text-3xl font-bold text-blue-800'>
                            Login to Read Posts
                        </h1>
                        <p className='text-lg text-gray-600'>
                            Please login to view and interact with posts
                            Demo account: abc@gmail.com
                            Demo password: 12345678
                        </p>
                        <Link to="/login">
                            <motion.button
                                className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Login Now
                            </motion.button>
                        </Link>
                    </motion.div>
                </Container>
            </motion.div>
        )
    }

    if (posts.length === 0) {
        return (
            <motion.div 
                className='w-full py-8 mt-4 text-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Container>
                    <motion.div 
                        className='flex flex-col items-center justify-center space-y-6'
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h1 className='text-3xl font-bold text-blue-800'>
                            No Posts Yet
                        </h1>
                        <p className='text-lg text-gray-600'>
                            Be the first to create a post!
                        </p>
                        <Link to="/add-post">
                            <motion.button
                                className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Create New Post
                            </motion.button>
                        </Link>
                    </motion.div>
                </Container>
            </motion.div>
        )
    }

    return(
        <motion.div 
            className='w-full py-8 bg-gradient-to-b from-blue-50 to-white'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Container>
                <motion.div 
                    className='flex flex-wrap'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {posts.map((post, index) => (
                        <motion.div 
                            key={post.$id} 
                            className='p-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ 
                                duration: 0.5, 
                                delay: 0.1 * index 
                            }}
                        >
                            <PostCard {...post} />
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </motion.div>
    )
}

export default Home