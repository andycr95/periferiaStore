import express from 'express'
import ProductController from '../controllers/productController';

const router = express.Router()

/**
 * @swagger
 * /api/products:
 *      get:
 *          tags:
 *              - Endpoints de productos
 *          description: Realiza la peticion para traer todos los productos registrados en el sistema.
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
 *                                     example: [{"id": 2,"title": "iPhone 12","description": "An apple mobile which is nothing like apple","price": 599,"brand": "Apple","thumbnail": "https://res.cloudinary.com/dzanaidkk/image/upload/v1673382501/iphone-12_dwkrik.jpg"}]
 *              500:
 *                  description: Internal server error
 * 
 */


// Listar todas los productos
router.get('/', async (_req, res) => {
  try {
    const products = await ProductController.getProducts();
    res.status(200).json({
      description: 'OK',
      data: products
    })
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
})

/**
 * @swagger
 * /api/products/search?search:
 *      get:
 *          tags:
 *              - Endpoints de productos
 *          description: Realiza la peticion para buscar productos y ordenarlos por los mas vendidos.
 *          parameters:
 *             - in: query
 *               name: search
 *               required: true
 *               schema:
 *                  type: string
 *               description: El producto a buscar por titulo
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
 *                                     example: [{"id": 7,"title": "iPhone 14 Pro Max","description": "An apple mobile which is nothing like apple","price": 799,"brand": "Apple","thumbnail": "https://res.cloudinary.com/dzanaidkk/image/upload/v1673382501/iphone-14-pro-max_lgrpih.jpg","_count": {"sales": 7}}]
 *              500:
 *                  description: Internal server error
 * 
 */

// Buscar productos
router.get('/search', async (_req, res) => {
  try {
    const search = _req.query.search?.toString() || '';
    const products = await ProductController.searchProducts(search);
    res.status(200).json({
      description: 'OK',
      data: products
    })
  } catch (error: any) {
    res.status(400).json({error: error.message})
  }
})

/**
 * @swagger
 * /api/products/sale:
 *      post:
 *          tags:
 *              - Endpoints de productos
 *          description: Realiza la peticion para la venta de productos seleccionados.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              user:
 *                                  type: object
 *                                  example: { "id": 1,"email": "a@g.com","name": "a","password": "1234","limit": 3000 }
 *                              products:
 *                                  type: array
 *                                  example: [{"id": 2,"title": "iPhone 12","description": "An apple mobile which is nothing like apple","price": 599,"brand": "Apple","thumbnail": "https://res.cloudinary.com/dzanaidkk/image/upload/v1673382501/iphone-12_dwkrik.jpg"}]
 *                              total:
 *                                  type: number
 *                                  example: 599
 *          responses:
 *              201:
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
 *                                     example: {"_sales": [{"id": 28,"productId": 2,"userId": 1,"amount": 1,"createdAt": "2023-01-12T13:19:58.440Z"}],"user": {"id": 1,"email": "a@g.com","name": "a","password": "1234","limit": 2401}}
 *              500:
 *                  description: Internal server error
 * 
 */


// Venta de productos
router.post('/sale', async (req, res) => {
  try {
    const {user, products, total} = req.body;
    const prod = await ProductController.saleProduct(user, products, total);
    res.status(200).json({
      description: 'OK',
      data: prod
    });
  } catch (error: any) {
    console.log(error);
    
    res.status(400).json({error: error.message})
  }
})
    



export default router