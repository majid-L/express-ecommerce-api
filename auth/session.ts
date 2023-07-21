import { Application } from "express";
import session from 'express-session';

const generateSession = (app: Application) => {
  const store = new session.MemoryStore();
  
  app.use(
    session({
      secret: 'dev_secret',
      cookie: { maxAge: 3e8, secure: true, sameSite: 'none' },
      saveUninitialized: false,
      resave: false,
      store
    })
  );
}

export default generateSession;