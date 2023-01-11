import express from 'express'
import UserController from '../controllers/userController';

const router = express.Router()

// Login
router.post('/login', async (_req, res) => {
  try {
    const { email, password } = _req.body;
    const user = await UserController.login(email, password);
    res.status(200).json({
      description: 'OK',
      data: user
    })
  } catch (error: any) {
    res.status(400).json({error: error.message})
  }
})


export default router