import {
    create, search, update, remove
} from '../controllers/studentController';
import passport from "passport";

export const studentRoutes = (app) => {
    app.post('/api/student', passport.authenticate('jwt', {session: false}), create);
    app.get('/api/student', passport.authenticate('jwt', {session: false}), search);
    app.put('/api/student', passport.authenticate('jwt', {session: false}), update);
    app.delete('/api/student', passport.authenticate('jwt', {session: false}), remove);
};
