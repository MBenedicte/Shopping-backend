import statusCode from '../config/statusCode';
import { decodeToken } from '../helpers';
export default async (req, res, next) => {
  const token = req.headers['token'];
  if (!token) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .json({ errors: { authentication: ' Please sign in' } });
  }
  const decode = await decodeToken(token);
  if (decode.errors || !decode) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .json({ errors: { token: decode.errors } });
  }
  return next();
};
