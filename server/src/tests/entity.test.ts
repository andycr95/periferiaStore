import entityController from '../controllers/productController';

//test para metodo obtener entidades
describe('EntityController', () => {
  describe('getEntities', () => {
    it('should return an array of entities', async () => {
      const entities = await entityController.getProducts();
      expect(entities).toBeInstanceOf(Array);
    });
  });
});