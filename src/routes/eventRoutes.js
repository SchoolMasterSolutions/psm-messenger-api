import {
  create, search, update, remove
} from '../controllers/eventController';

export const eventRoutes = (app) => {
  app.post('/api/event', create);
  app.get('/api/event', search);
  app.put('/api/event', update);
  app.delete('/api/event', remove);
};
