import {
  create, search, update, remove, login, resetPassword
} from '../controllers/userController';

export const userRoutes = (app) => {
  app.post('/api/user/login', login);
  app.post('/api/user/reset/password', resetPassword);
  app.post('/api/user', create);
  app.get('/api/user', search);
  app.put('/api/user', update);
  app.delete('/api/user', remove);
};
