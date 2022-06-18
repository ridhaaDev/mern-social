import express from 'express'
import { delete_user, follow_user, get_user, unfollow_user, update_user } from '../controllers/user_controller.js'

const router = express.Router()

router.get('/:id', get_user)
router.put('/:id', update_user)
router.delete('/:id', delete_user)
router.put('/:id/follow', follow_user)
router.put('/:id/unfollow', unfollow_user)

export default router