
exports.users = function(req, res, next){

    res.render('users', { title: 'Users Route' ,
        data: 'users_data'});
};