import productController from '../controllers/productController';
import { products } from '../../prisma/products'

//test para validar metodo listar de productos
describe('ProductController', () => {
  describe('Obtener productos', () => {
    it('Deberia retornar un array de productos', async () => {
      const _products = await productController.getProducts();
      expect(_products).toEqual(expect.any(Array));
    });
  });
});

//test para validar buscar producto por string
describe('ProductController', () => {
  describe('Buscar productos', () => {
    it('Deberia retornar un array de productos', async () => {
      const product = await productController.searchProducts('SE');
      expect(product).toEqual(expect.any(Array));
    });
  });
});

//test para validar metodo venta de productos
describe('ProductController', () => {
  describe('Comprar productos', () => {
    it('Deberia retornar un objeto compuesto por usuario y venta registrada', async () => {
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
      const _buy = await productController.saleProduct(_user, _products, _total);
      expect(_buy).toEqual(expect.any(Object));
    });
  });
});