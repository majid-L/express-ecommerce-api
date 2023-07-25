import passport from 'passport';
import localStrategyConfig from './localStrategy';
import { Application } from 'express';

const formatUserData = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    username: user.username
  };
}

const passportConfig = (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.use(localStrategyConfig());

  // stores user to session
  passport.serializeUser((user, done) => {
    done(null, formatUserData(user as User));
  });
  
  // retrieves user from session
  passport.deserializeUser((user, done) => {
    done(null, formatUserData(user as User));
  });
};

export default passportConfig;