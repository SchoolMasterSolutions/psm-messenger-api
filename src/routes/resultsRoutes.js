import {
  create, search, update, remove
} from '../controllers/resultsController';

export const resultsRoutes = (app) => {
  app.post('/api/results', create);
  app.get('/api/results', search);
  app.put('/api/results/:_id', update);
  app.delete('/api/results/:_id', remove);
};
