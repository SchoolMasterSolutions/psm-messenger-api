import {
  create, search, update, remove
} from '../controllers/resultsController';

export const resultsRoutes = (app) => {
  app.post('/api/results', create);
  app.get('/api/results', search);
    app.put('/api/results', update);
    app.delete('/api/results', remove);
};
