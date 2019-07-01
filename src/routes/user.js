import {
  create,
  search,
  details,
  update,
  remove
} from '../controllers/user';

export const user_routes = (app) => {
  app.post('/api/user', create);
  app.get('/api/user/:keyword', search);
  app.get('/api/user/:id', details);
  app.put('/api/user/:id', update);
  app.delete('/api/user/:id', remove);
};