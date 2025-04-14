import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { motion } from 'framer-motion'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setIsLoading(false)
        })
    }, [])

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
                                Loading posts...
                            </h1>
                        </div>
                    </motion.div>
                </Container>
            </motion.div>
        )
    }

    return (
        <motion.div 
            className='w-full py-8 bg-gradient-to-b from-blue-50 to-white min-h-screen'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Container>
                <motion.h1 
                    className="text-3xl font-bold text-center text-blue-800 mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    All Posts
                </motion.h1>
                <motion.div 
                    className='flex flex-wrap'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
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

export default AllPosts