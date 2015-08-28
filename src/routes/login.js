
exports.login = function(req, res, next){

    // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
};