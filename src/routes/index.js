
/*
 * GET home page.
 */


//index route
exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};