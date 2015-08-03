
exports.landingpage = function(req, res, next){

    res.render('landingpage', { title: 'landingpage' ,
        data: 'landingpage', message: 'landingpage'});
};