const jwt = require('jsonwebtoken');

/* ---------- Authentication ---------- */
function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        req.user = null;
        res.locals.user = null;
        res.locals.isAdmin = false;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        res.locals.user = decoded;
        res.locals.isAdmin = decoded.role === "admin";
    } catch (err) {
        res.clearCookie("token");
        req.user = null;
        res.locals.user = null;
        res.locals.isAdmin = false;
    }

    next();
}

/* ---------- Authorization ---------- */
function requireAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).send("Authentication required");
    }
    next();
}

function requireAdmin(req, res, next) {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).send("Admin access required");
    }
    next();
}

module.exports = {
    authMiddleware,
    requireAuth,
    requireAdmin
};