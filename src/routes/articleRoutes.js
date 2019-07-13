import {
  create, search, update, remove
} from '../controllers/articleController';

export const articleRoutes = (app) => {
  app.post('/api/article', create);
  app.get('/api/article', search);
  app.put('/api/article/:_id', update);
  app.delete('/api/article/:_id', remove);
};
