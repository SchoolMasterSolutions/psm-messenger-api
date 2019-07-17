import {
    create, search, update, remove
} from '../controllers/schoolController';
import passport from "passport"

export const schoolRoutes = (app) => {
    app.post('/api/school', passport.authenticate('jwt', {session: false}), create);
    app.get('/api/school', passport.authenticate('jwt', {session: false}), search);
    app.put('/api/school', passport.authenticate('jwt', {session: false}), update);
    app.delete('/api/school', passport.authenticate('jwt', {session: false}), remove);
};
