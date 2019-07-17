import {
  create, search, update, remove
} from '../controllers/eventController';
import passport from "passport";

export const eventRoutes = (app) => {
  app.post('/api/event', passport.authenticate('jwt', {session: false}), create);
  app.get('/api/event', passport.authenticate('jwt', {session: false}), search);
  app.put('/api/event', passport.authenticate('jwt', {session: false}), update);
  app.delete('/api/event', passport.authenticate('jwt', {session: false}), remove);
};
