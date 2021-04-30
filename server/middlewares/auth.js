const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) 
        return next(new ErrorResponse(401, 'Access token not found'));

    // Validate token
    try {
        const decode = jwt.verify(token, process.env.TOKEN_ACCESS_SECRET);
        
        req.userId = decode.userId;
        
        next();

    } catch (err) {
        next(new Error(401, 'Invalid token'));
    }

}

module.exports = verifyToken;