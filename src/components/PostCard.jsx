import React from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <motion.div 
          className='w-full bg-blue-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.div 
              className='w-full justify-center mb-4 overflow-hidden rounded-xl'
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl w-full h-48 object-cover'/>
            </motion.div>
            <motion.h2
              className='text-xl font-bold text-blue-800'
              whileHover={{ color: "#1E40AF" }}
              transition={{ duration: 0.2 }}
            >{title}</motion.h2>
        </motion.div>
    </Link>
  )
}

export default PostCard