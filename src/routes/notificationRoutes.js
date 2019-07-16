import {
  search, update, remove, send
} from '../controllers/notificationController';

export const notificationRoutes = (app) => {
  app.post('/api/notification', send);
  app.get('/api/notification', search);
  app.put('/api/notification', update);
  app.delete('/api/notification', remove);
};
