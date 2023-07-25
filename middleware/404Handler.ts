import { Request, Response } from 'express';

const _404Handler = (req: Request, res: Response) => {
  res.status(404).send({msg: "No resources are available at this URL."})
}

export default _404Handler;