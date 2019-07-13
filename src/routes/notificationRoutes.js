import {
  create, search, update, remove
} from '../controllers/notificationController';

export const notificationRoutes = (app) => {
  app.post('/api/notification', create);
  app.get('/api/notification', search);
  app.put('/api/notification/:_id', update);
  app.delete('/api/notification/:_id', remove);
};
