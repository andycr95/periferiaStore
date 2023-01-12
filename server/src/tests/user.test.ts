import userController from '../controllers/userController';

//test para validar metodo login
describe('UserController', () => {
  describe('login', () => {
    it('should return an object', async () => {
      const user = await userController.login('a@g.com', '1234');
      expect(user).toEqual(expect.any(Object));
    });
  });
});