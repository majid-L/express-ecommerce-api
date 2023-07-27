import { Request, Response } from 'express';

const _404Handler = (req: Request, res: Response) => {
  res.status(404).send({msg: "No routes are mapped to serve this URL."})
}

export default _404Handler;