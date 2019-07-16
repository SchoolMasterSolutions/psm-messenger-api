import {
  create, search, update, remove
} from '../controllers/schoolController';

export const schoolRoutes = (app) => {
  app.post('/api/school', create);
  app.get('/api/school', search);
  app.put('/api/school', update);
  app.delete('/api/school', remove);
};
