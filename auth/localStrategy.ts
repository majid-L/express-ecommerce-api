import { Strategy } from 'passport-local';
import prisma from "../prisma/prisma";
import bcrypt from 'bcrypt';

const localStrategyConfig = () => {
  return new Strategy(
    async function verify(username, password, done) {
      try {
        const customerOrNull = await prisma.customer.findUnique({ 
          where: { username }
        });

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