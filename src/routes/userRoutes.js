import {
    create, search, update, remove, login, resetPassword
} from '../controllers/userController';
import passport from "passport";

export const userRoutes = (app) => {
    app.post('/api/user/login', login);
    app.post('/api/user/reset/password', resetPassword);
    app.post('/api/user', passport.authenticate('jwt', {session: false}), create);
    app.get('/api/user', passport.authenticate('jwt', {session: false}), search);
    app.put('/api/user', passport.authenticate('jwt', {session: false}), update);
    app.delete('/api/user', passport.authenticate('jwt', {session: false}), remove);
};
