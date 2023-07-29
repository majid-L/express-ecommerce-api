import { Request, Response, NextFunction } from 'express';

const validateRequestMethod = (req: Request, res: Response, next: NextFunction) => {
  let send405Response = false;
  
  switch(true) {
    case req.url.startsWith('/api/products'):
    case /^\/api\/customers\/\d+\/reviews/.test(req.url):
    case /^\/api\/customers\/\d+\/orders\/\d+$/.test(req.url):
      if (req.method !== 'GET') {
        res.set('Allow', 'GET');
        send405Response = true;
      }
      break;
    
    case /^\/api\/customers\/\d+$/.test(req.url):
    case /^\/api\/reviews\/\d+$/.test(req.url):
      if (req.method === 'POST') {
        res.set('Allow', 'GET, PUT, DELETE');
        send405Response = true;
      }
      break;

    case /^\/api\/customers\/\d+\/cart$/.test(req.url):
      if (!/^(GET|PUT)$/.test(req.method)) {
        res.set('Allow', 'GET, PUT');
        send405Response = true;
      }
      break;

    case /^\/api\/customers\/\d+\/orders$/.test(req.url):
    case /^\/api\/reviews$/.test(req.url):
      if (!/^(GET|POST)$/.test(req.method)) {
        res.set('Allow', 'GET, POST');
        send405Response = true;
      }
      break;

    case /^\/api\/(login|signup|logout)$/.test(req.url):
      if (req.method !== 'POST') {
        res.set('Allow', 'POST');
        send405Response = true;
      }
  }
  
  if (send405Response) {
    res.status(405).send({msg: 'Method not allowed.'});
  } else {
    next();
  }
}

export default validateRequestMethod;