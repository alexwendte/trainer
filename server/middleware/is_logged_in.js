module.exports = function isAuthenticated(req, res, next) {
    if(req.user) {
        return next();
    }
    res.redirect('/login')
}