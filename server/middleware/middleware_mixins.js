const { ObjectID } = require('mongodb');
const isEmpty = require('lodash').isEmpty;

function isAuthenticated(req, res, next) {
    if(req.user) {
        return next();
    }
    res.status(401).json({message: "you must be logged in"});
}

function validateObjectID(req, res, next) {
    /**
     * Middleware to validate that all the id params in the req
     * are valid MongoDB Object IDS
     */
    if(!isEmpty(req.params)) {
        for(let param in req.params) {
            if(!ObjectID.isValid(req.params[param]))
            res.status(400).json({message: "You have entered an invalid ID"});
        }
    }
    return next();
}

module.exports = {
    isAuthenticated,
    validateObjectID
}
    
