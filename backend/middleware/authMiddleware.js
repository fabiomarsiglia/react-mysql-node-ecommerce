const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // check for header 
    if(!authHeader) {
        return res.status(401).json({ message: 'Missing Token' });
    }

    // extract token
    const token = authHeader.split(' ')[1]; // Bearer token

    if(!token) {
        return res.status(401).json({ message: 'Invalid Token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token
        req.user = decoded;     // link user to request {id, role}
        next();
    } catch(error) {
        return res.status(401).json({ message: 'Invalid or expired Token' });
    }

};

module.exports = authMiddleware;