import express from "express";

import createBlog from "../controller/blog/createBlog";
import getBlogs from "../controller/blog/getBlogs";
import getBlog from "../controller/blog/getBlog";
import updateBlog from "../controller/blog/updateBlog";
import getArchivedBlogs from "../controller/blog/getArchivedBlogs";
import deleteBlog from "../controller/blog/deleteBlog";
import validateToken from "../controller/auth/authController"

const router = express.Router();

router.post('/', validateToken, createBlog)
router.get('/', getBlogs)
router.get('/archived', validateToken, getArchivedBlogs)
router.get('/:id', getBlog)
router.put('/:id', validateToken, updateBlog)
router.delete('/:id', validateToken, deleteBlog)

export default router;
