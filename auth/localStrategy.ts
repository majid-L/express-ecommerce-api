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

        if (!customerOrNull || customerOrNull.password === null) {
          return done(null, false, { message: 'Invalid username.' });
        } else {
          const hashedPassword = customerOrNull.password!;
          const matchedPassword = await bcrypt.compare(password, hashedPassword);
          if (!matchedPassword) {
            return done(null, false, { message: 'Invalid password.' });
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