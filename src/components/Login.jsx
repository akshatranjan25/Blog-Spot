import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: { errors }} = useForm()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const login = async(data) => {
        setError("")
        setIsLoading(true)
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <motion.div
      className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
        <motion.div 
          className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 shadow-lg border border-blue-200`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
        <motion.div 
          className='mb-2 flex justify-center'
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%'/>
            </span>
        </motion.div>
        <motion.h2 
          className='text-center text-2xl font-bold leading-tight text-blue-800'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Sign in to your account
        </motion.h2>
        <motion.p 
          className="mt-2 text-center text-base text-blue-600"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-800 hover:underline"
          >
            Sign Up
          </Link>
        </motion.p>
        {error && (
          <motion.p 
            className="text-red-600 mt-8 text-center bg-red-50 p-3 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
        <motion.form 
          onSubmit={handleSubmit(login)} 
          className='mt-8'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
            <div className='space-y-5'>
                <Input
                  label = "Email: "
                  placeholder ="Enter your email"
                  type="email"
                  error={errors.email?.message}
                  {...register("email",{
                      required: "Email is required",
                      validate: {
                          matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                          "Email address must be a valid address",
                      }
                  })}
                />
                <Input
                  label = "Password: "
                  type="password"
                  placeholder ="Enter your password"
                  error={errors.password?.message}
                  {...register("password",{
                      required: "Password is required",
                      minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters"
                      }
                  })}
                />
                <Button
                  type = "submit"
                  className = "w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                  disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                        </span>
                    ) : 'Sign in'}
                </Button>
            </div>
        </motion.form>
        </motion.div>
    </motion.div>
  )
}

export default Login