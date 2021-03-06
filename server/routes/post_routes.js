import express from "express";
import { create_post, delete_post, get_post, get_timeline_posts, like_post, update_post } from "../controllers/post_controller.js";
const router = express.Router()

router.post('/', create_post)
router.get('/:id', get_post)
router.put('/:id', update_post)
router.delete('/:id', delete_post)
router.put('/:id/like', like_post)
router.get("/:id/timeline", get_timeline_posts)

export default router