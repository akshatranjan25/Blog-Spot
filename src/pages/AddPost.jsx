import React from 'react'
import { Container, PostForm } from '../components'
import { motion } from 'framer-motion'

function AddPost() {
  return (
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
            Create New Post
          </h1>
          <PostForm/>
        </motion.div>
      </Container>
    </motion.div>
  )
}

export default AddPost