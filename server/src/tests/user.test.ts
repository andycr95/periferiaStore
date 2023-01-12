import userController from '../controllers/userController';

//test para validar metodo listar de usuarios
describe('UserController', () => {
  describe('Obtener usuarios', () => {
    it('Deberia retornar un array de usuarios', async () => {
      const users = await userController.getUsers();
      expect(users).toEqual(expect.any(Array));
    });
  });
});

//test para validar metodo login
describe('UserController', () => {
  describe('login', () => {
    it('Deberia retornar un objeto compuesto por estado y usuario logueado', async () => {
      const user = await userController.login('a@g.com', '1234');
      expect(user).toEqual(expect.any(Object));
    });
  });
});