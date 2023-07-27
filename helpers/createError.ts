const createError = (msg: string, status: number): MiddlewareError => {
  const err: MiddlewareError = Error(msg);
  err.status = status;
  return err;
}

export default createError;