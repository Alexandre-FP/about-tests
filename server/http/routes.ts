import { Router } from 'express'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()

router.post('/created', register)
router.post('/session', authenticate)

export default router
