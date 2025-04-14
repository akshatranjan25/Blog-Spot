import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Post() {
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
                setIsLoading(false);
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }
    };

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
        );
    }

    return post ? (
        <motion.div 
            className="py-8 bg-gradient-to-b from-blue-50 to-white min-h-screen"
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
                    <motion.div 
                        className="w-full flex justify-center mb-4 relative border-2 border-blue-200 rounded-xl p-4 bg-white shadow-lg"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="relative w-full max-w-4xl mx-auto">
                            <div className="aspect-[16/9] max-h-[70vh] w-full flex items-center justify-center">
                                <img
                                    src={appwriteService.getFilePreview(post.featuredImage)}
                                    alt={post.title}
                                    className="rounded-xl max-w-full max-h-full w-auto h-auto object-contain"
                                />
                            </div>
                        </div>

                        {isAuthor && (
                            <motion.div 
                                className="absolute right-6 top-6 flex gap-2"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 }}
                            >
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button 
                                        bgColor="bg-green-500 hover:bg-green-600" 
                                        className="mr-3 transition-colors duration-300"
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button 
                                    bgColor="bg-red-500 hover:bg-red-600" 
                                    onClick={deletePost}
                                    className="transition-colors duration-300"
                                >
                                    Delete
                                </Button>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div 
                        className="w-full mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h1 className="text-3xl font-bold text-blue-800">{post.title}</h1>
                    </motion.div>

                    <motion.div 
                        className="browser-css bg-white p-6 rounded-xl shadow-lg"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {parse(post.content)}
                    </motion.div>
                </motion.div>
            </Container>
        </motion.div>
    ) : null;
}