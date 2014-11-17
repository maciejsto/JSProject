
module.exports.portfolio = function(req, res, next){

    res.render('portfolio', { title: 'Users Route' ,
        data: 'users_data'});
};