import express from 'express'
import UserController from '../controllers/userController';

const router = express.Router()

/**
 * @swagger
 * /api/users:
 *      get:
 *          tags:
 *              - Endpoints de usuarios
 *          description: Realiza la peticion para traer todos los usuarios registrados en el sistema.
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  description:
 *                                      type: string
 *                                      example: OK
 *                                  data:
 *                                     type: array
 *                                     example: [{id: 1,email: 'a@g.com',name: 'a',password: '1234',limit: 3000},{id: 2,email: 'b@g.com',name: 'b',password: '1234',limit: 5000}]
 *              500:
 *                  description: Internal server error
 * 
 */

// Listar todas los usuarios
router.get('/', async (_req, res) => {
  try {
    const users = await UserController.getUsers();
    res.status(200).json({
      description: 'OK',
      data: users
    })
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
})

/**
 * @swagger
 * /api/users/login:
 *      post:
 *          tags:
 *              - Endpoints de usuarios
 *          description: Realiza la peticion para iniciar sesion en el sistema.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: a@g.com
 *                              password:
 *                                  type: string
 *                                  example: 1234
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  description:
 *                                      type: string
 *                                      example: OK
 *                                  data:
 *                                     type: array
 *                                     example: {"id": 1,"email": "a@g.com","name": "a","password": "1234","limit": 2401}
 *              500:
 *                  description: Internal server error
 * 
 */
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