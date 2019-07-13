import {
  create, search, update, remove
} from '../controllers/eventController';

export const eventRoutes = (app) => {
  app.post('/api/event', create);
  app.get('/api/event', search);
  app.put('/api/event/:_id', update);
  app.delete('/api/event/:_id', remove);
};
