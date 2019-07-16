import {
  create, search, update, remove
} from '../controllers/subscriptionController';

export const subscriptionRoutes = (app) => {
  app.post('/api/subscription', create);
  app.get('/api/subscription', search);
    app.put('/api/subscription', update);
    app.delete('/api/subscription', remove);
};
