function redirect(req, res, uri) {
    res.redirect(req.protocol + "://" + req.headers.host + uri);
}

module.exports.redirect = redirect;