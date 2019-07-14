import {
  create, search, update, remove
} from '../controllers/subscriptionController';

export const subscriptionRoutes = (app) => {
  app.post('/api/subscription', create);
  app.get('/api/subscription', search);
  app.put('/api/subscription/:_id', update);
  app.delete('/api/subscription/:_id', remove);
};
