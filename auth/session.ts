import { Application } from "express";
import session from 'express-session';
import connectPg from 'connect-pg-simple';
import pool from "../pool";
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
  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      cookie: { 
        maxAge: 30 * 24 * 60 * 60 * 1000, 
        secure: process.env.NODE_ENV === 'prod' ? true : false, 
        httpOnly: false,
        sameSite: 'none' 
      },
      saveUninitialized: false,
      resave: false,
      store: new pgSession({
        pool,
        tableName: 'session'
      })
    })
  );
}

export default generateSession;