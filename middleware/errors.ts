import { Request, Response, NextFunction } from 'express';

const handleError = (err: MiddlewareError, req: Request, res: Response, next: NextFunction) => {
  let msg = '';
  
  switch (true) {
    case err.message.includes("Unique constraint failed on the fields: (`username`)"):
      msg = 'That username is already taken.';
      err.status = 400;
      break;

    /* Deal with invalid data types, e.g. in PUT request body for /customers/:id */
    case err.message.includes("Invalid value provided"):
      msg = err.message
        .match(/Argument\s[^:]+[^.]+\.[^.]+\./i)?.[0] || 'Invalid value provided.';
      err.status = 400;
      break;

    /* Deal with invalid data types for named columns in query string, e.g sortBy */
    case err.message.includes("Invalid value"):
      msg = err.message
        .match(/Invalid\svalue\sfor\sargument\s`[^`]+`\.\sExpected\s[^.]+\./i)?.[0] 
        || 'Invalid value provided.';
      err.status = 400;
      break;

    /* Deal with null values */
    case err.message.includes("must not be null"):
      msg = err.message
        .match(/Argument[^.]+\./i)?.[0] 
        || 'Invalid query.';
      err.status = 400;
      break;

    case err.message.includes("Unknown argument"):
      msg = err.message
        .match(/Unknown\sargument\s[^.]+.\s[^?]+\?/i)?.[0] 
        || 'Invalid query.';
      err.status = 400;
      break;

    case /Argument\s`[^`]+`\sis\smissing/i.test(err.message):
      const missingArgument = err.message
        .match(/Argument\s`[^`]+`\sis\smissing\./i)?.[0] || null;
      msg = missingArgument ? `Invalid query. ${missingArgument}` : 'Invalid query.';
      err.status = 400;
      break;

    case /(prisma|invocation|constraint)/i.test(err.message):
      msg = 'Error querying the database.';
      err.status = 400;
      break;

    default:
      msg = err.message;
  }

  res.status(err.status || 500).send({ error: { status: err.status || 500, info: msg } });
}

export default handleError;