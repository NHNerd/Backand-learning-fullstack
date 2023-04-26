import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  // Get JWT token from headers from authorization from request
  //? if furst definition is undefind, then get second definition
  const token = (req.headers.authorization || '').replace(/Bearer\s/, ''); //? replace is regular expression

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret1234');
      //? Write id in body of request
      req.userId = decoded._id;

      next();
    } catch (e) {
      return res.status(403).json({
        maessage: 'No access. Token is not decoded',
      });
    }
  } else {
    //? Return stop code, for second res not executing
    return res.status(403).json({
      maessage: 'No access, Tokin is not valid',
    });
  }
};

export default checkAuth;
