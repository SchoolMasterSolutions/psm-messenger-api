import passport from 'passport';
import {
  search,
  update,
  remove,
  send,
} from '../controllers/notificationController';

export const notificationRoutes = (app) => {
  app.post('/api/notification', passport.authenticate('jwt', {
    session: false,
  }), send);
  app.get('/api/notification', passport.authenticate('jwt', {
    session: false,
  }), search);
  app.put('/api/notification', passport.authenticate('jwt', {
    session: false,
  }), update);
  app.delete('/api/notification', passport.authenticate('jwt', {
    session: false,
  }), remove);
};
