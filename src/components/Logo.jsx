import React from 'react'
import blogLogo from '../assets/blog-svgrepo-com.svg'

function Logo({width = '100px'}) {
  return (
    <img 
      src={blogLogo} 
      alt="MegaBlog Logo" 
      style={{ width: width }}
      className="h-auto"
    />
  )
}

export default Logo