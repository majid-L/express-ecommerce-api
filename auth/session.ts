import { Application } from "express";
import session from 'express-session';
import connectPg from 'connect-pg-simple';
import pg from 'pg';
import 'dotenv/config';

declare module 'express-session' {
  interface SessionData {
    passport?: {
      user: {
        id: number,
        name: string,
        username: string,
        passowrd: string,
        email: string,
        join_date: string
      }
    }
  }
}

const generateSession = (app: Application) => {
  const pgSession = connectPg(session);
  const pgPool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    max: 2
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      cookie: { 
        maxAge: 30 * 24 * 60 * 60 * 1000, 
        secure: process.env.DATABASE_URL!.includes('localhost') ? false : true, 
        sameSite: 'none' 
      },
      saveUninitialized: false,
      resave: false,
      store: new pgSession({
        pool: pgPool,
        tableName: 'session'
      })
    })
  );
}

export default generateSession;