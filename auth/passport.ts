import passport from 'passport';
import localStrategyConfig from './localStrategy';
import { Application } from 'express';
import type { User } from '../types/types';

const passportConfig = (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.use(localStrategyConfig());

  // stores user to session
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  // retrieves user from session
  passport.deserializeUser((user, done) => {
    done(null, user as User);
  });
};

export default passportConfig;