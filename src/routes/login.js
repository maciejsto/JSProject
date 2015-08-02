
exports.login = function(req, res, next){

    res.render('login', { title: 'Users Route' ,
        data: 'users_data'});
};