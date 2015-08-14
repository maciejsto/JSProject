exports.signup = function(req, res, next){

    res.render('signup', { title: 'Users Route' ,
        data: 'users_data'});
};