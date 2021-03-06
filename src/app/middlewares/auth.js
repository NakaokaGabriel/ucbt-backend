import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authAuthorization = req.headers.authorization;

  if (!authAuthorization) {
    return res.status(401).json({ error: 'Token is not provided' });
  }

  const [, token] = authAuthorization.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid Token' });
  }
};
