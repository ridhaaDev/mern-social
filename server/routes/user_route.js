import express from 'express'
import { delete_user, get_user, update_user } from '../controllers/user_controller.js'

const router = express.Router()

router.get('/:id', get_user)
router.put('/:id', update_user)
router.delete('/:id', delete_user)

export default router