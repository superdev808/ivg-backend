const get = require('lodash/get');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { isValidToken } = require("../utils/validation");

exports.checkAccessToken = (req, res, next) => {
    try {
        const beaerToken = get(req, 'headers.authorization');
        if (!beaerToken) {
            return res.status(400).json({ status: 'Error', message: 'Invalid header' });
        }

        const token = beaerToken.split(' ')[1];

        
        let decoded = jwt.verify(token, keys.secretOrKey);

        const validToken = isValidToken(decoded.exp);
        if (validToken) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({ status: 'Error', message: 'Server Unauthorized' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 'Error', message: 'Invalid Token' });
    }
};
