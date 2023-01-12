import productController from '../controllers/productController';
import { products } from '../../prisma/products'

//test para validar metodo listar de productos
describe('ProductController', () => {
  describe('Obtener productos', () => {
    it('should return an object', async () => {
      const _products = await productController.getProducts();
      expect(_products).toEqual(products);
    });
  });
});

//test para validar buscar producto por string
describe('ProductController', () => {
  describe('Buscar productos', () => {
    it('should return an object', async () => {
      const _product = await productController.searchProducts('SE');
      expect(_product[0]).toEqual(products[2]);
    });
  });
});

//test para validar metodo comprar de productos
describe('ProductController', () => {
  describe('Comprar productos', () => {
    it('should return an object', async () => {
      const _user = {
        id: 1,
        name: 'a',
        email: 'a@g.com',
        limit: 7000
      }
      const _products = [
        products[0],
        products[0],
        products[1],
        products[2],
      ]
      const _total = 1200;
      const _buy = await productController.buyProduct(_user, _products, _total);
      expect(_buy).toEqual(expect.any(Object));
    });
  });
});