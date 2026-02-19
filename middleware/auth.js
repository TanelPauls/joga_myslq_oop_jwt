const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        res.locals.user = null;
        res.locals.isAdmin = false;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        res.locals.user = decoded;
        res.locals.isAdmin = decoded.role === "admin";

        next();
    } catch (err) {
        res.clearCookie("token");
        res.locals.user = null;
        res.locals.isAdmin = false;
        next();
    }
};
