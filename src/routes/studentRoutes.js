import {
  create, search, update, remove
} from '../controllers/studentController';

export const studentRoutes = (app) => {
  app.post('/api/student', create);
  app.get('/api/student', search);
  app.put('/api/student', update);
  app.delete('/api/student', remove);
};
