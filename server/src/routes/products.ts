import express from 'express'
import ProductController from '../controllers/productController';

const router = express.Router()

// Listar todas los productos
router.get('/', async (_req, res) => {
  try {
    const products = await ProductController.getProducts();
    res.status(200).json({
      description: 'OK',
      data: products
    })
  } catch (error: any) {
    res.status(400).json({error: error.message})
  }
})

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

export default router