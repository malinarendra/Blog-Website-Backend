const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY_JWT
const tokenExpireTime = process.env.TOKEN_EXPIRE_TIME

const generateJSONWebToken = async (payload) => {
    let token = await jwt.sign(payload, secretKey, { expiresIn: tokenExpireTime })
    return token
}

const checkJSONWebToken = (req, res, next) => {
    let cookieToken = req.cookies.Authorization;

    if (cookieToken) {
        let token = cookieToken.replace("Bearer ", "");

        jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ success: false, message: 'Token expired' });
                } else if (err.name === 'JsonWebTokenError') {
                    return res.status(401).json({ success: false, message: 'Invalid token' });
                } else {
                    return res.status(500).json({ success: false, message: 'Failed to authenticate token' });
                }
            } else {
                // Token is valid
                // req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({ success: false, message: "Authorization token not provided" });
    }
};

module.exports = { generateJSONWebToken, checkJSONWebToken }