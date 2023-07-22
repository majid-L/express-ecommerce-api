import passport from "passport"
import { Strategy } from 'passport-local';
import prisma from "../prisma/prisma";
import bcrypt from 'bcrypt';

const localStrategyConfig = () => {
  return new Strategy(
    async function validate(username, password, done) {
      try {
        const customerOrNull = await prisma.customer.findUnique({ 
          where: { username }
        });

        const err: Error = new Error ('Invalid username or password.');
        (err as Error & { status: number }).status = 400;

        if (!customerOrNull) {
          return done(null, false);
        } else {
          const hashedPassword = customerOrNull.password;
          const matchedPassword = await bcrypt.compare(password, hashedPassword);
          if (!matchedPassword) {
            return done(null, false);
          } else {
            return done (null, customerOrNull);
          }
        }
      } catch (err) {
        return done(err);
      }
    }
  );
}

export default localStrategyConfig;