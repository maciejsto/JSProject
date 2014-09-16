/**
 * Created by Maciej on 9/3/2014.
 */

/*
 * GET home page.
 */


//index route
exports.admin = function(req, res){
    res.render('admin', { title: 'Admin panel' });
};