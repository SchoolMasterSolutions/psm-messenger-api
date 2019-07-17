import {
    create, search, update, remove
} from '../controllers/subscriptionController';
import passport from "passport";

export const subscriptionRoutes = (app) => {
    app.post('/api/subscription', passport.authenticate('jwt', {session: false}), create);
    app.get('/api/subscription', passport.authenticate('jwt', {session: false}), search);
    app.put('/api/subscription', passport.authenticate('jwt', {session: false}), update);
    app.delete('/api/subscription', passport.authenticate('jwt', {session: false}), remove);
};
