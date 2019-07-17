import {
    create, search, update, remove
} from '../controllers/resultsController';
import passport from "passport";

export const resultsRoutes = (app) => {
    app.post('/api/results', passport.authenticate('jwt', {session: false}), create);
    app.get('/api/results', passport.authenticate('jwt', {session: false}), search);
    app.put('/api/results', passport.authenticate('jwt', {session: false}), update);
    app.delete('/api/results', passport.authenticate('jwt', {session: false}), remove);
};
