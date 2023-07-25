import { Request, Response, NextFunction } from 'express';

const handleError = (err: MiddlewareError, req: Request, res: Response, next: NextFunction) => {
  let msg = '';
  console.log(err)
  switch (true) {
    case err.message.includes("Unique constraint failed on the fields: (`username`)"):
      msg = 'That username is already taken.';
      err.status = 400;
      break;

    case err.message.includes("Invalid value provided"):
      const invalidArgument: string = err.message
        .match(/Argument\s([^:]+)/i)?.[1] || 'unknown';
      msg = `Invalid value provided. Argument: ${invalidArgument}.`;
      err.status = 400;
      break;

    case err.message.includes("Unknown argument"):
      msg = err.message
        .match(/Unknown\sargument\s(.+).\sDid\syou\smean\s([^?]+)/i)?.[0] 
        || 'Invalid query.';
      err.status = 400;
      break;

    case /(prisma|invocation|constraint)/i.test(err.message):
      msg = 'Invalid query.';
      err.status = 400;
      break;

    default:
      msg = err.message;
  }

  res.status(err.status || 500).send({ msg });
}

export default handleError;