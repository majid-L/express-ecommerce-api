import { Application } from "express";
import expressSession from 'express-session';
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from '../prisma/prisma';
import type { IPrisma } from "@quixo3/prisma-session-store/dist/@types";
import type { PrismaClient } from "@prisma/client";

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

const store: PrismaSessionStore<"session"> = new PrismaSessionStore(
  prisma as PrismaClient & IPrisma<"session">,
  {
    checkPeriod: 2 * 60 * 1000,  //ms
    dbRecordIdIsSessionId: true
  }
);

const secure = process.env.NODE_ENV === 'prod' ? true : false;

const generateSession = (app: Application) => {
  app.use(
    expressSession({
      secret: process.env.SESSION_SECRET as string,
      cookie: { 
        maxAge: 30 * 24 * 60 * 60 * 1000, 
        secure: true,
        httpOnly: true,
        sameSite: 'none' 
      },
      saveUninitialized: false,
      resave: false,
      store
    })
  );
}

export default generateSession;