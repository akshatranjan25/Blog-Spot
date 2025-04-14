import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { motion } from 'framer-motion'

function Footer() {
  return (
    <motion.section 
      className="relative overflow-hidden py-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <motion.div 
            className="w-full p-6 md:w-1/2 lg:w-5/12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-blue-100">
                  &copy; Copyright 2024. All Rights Reserved by MegaBlog.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="w-full p-6 md:w-1/2 lg:w-2/12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-blue-200">
                Company
              </h3>
              <ul>
                {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item, index) => (
                  <motion.li 
                    key={item}
                    className="mb-4"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Link
                      className="text-base font-medium text-white hover:text-blue-200 transition-colors duration-300"
                      to="/"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div 
            className="w-full p-6 md:w-1/2 lg:w-2/12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-blue-200">
                Support
              </h3>
              <ul>
                {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item, index) => (
                  <motion.li 
                    key={item}
                    className="mb-4"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Link
                      className="text-base font-medium text-white hover:text-blue-200 transition-colors duration-300"
                      to="/"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div 
            className="w-full p-6 md:w-1/2 lg:w-3/12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-blue-200">
                Legals
              </h3>
              <ul>
                {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item, index) => (
                  <motion.li 
                    key={item}
                    className="mb-4"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Link
                      className="text-base font-medium text-white hover:text-blue-200 transition-colors duration-300"
                      to="/"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Footer