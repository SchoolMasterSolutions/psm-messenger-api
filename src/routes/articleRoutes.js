import {
    create, search, update, remove
} from '../controllers/articleController';
import passport from "passport";

export const articleRoutes = (app) => {
    app.post('/api/article', passport.authenticate('jwt', {session: false}), create);
    app.get('/api/article', passport.authenticate('jwt', {session: false}), search);
    app.put('/api/article', passport.authenticate('jwt', {session: false}), update);
    app.delete('/api/article', passport.authenticate('jwt', {session: false}), remove);
};
