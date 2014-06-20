/**
 * Created by Maciej on 6/16/2014.
 */
exports.error = function(req, res){
    res.send("Fucnking errorrrrrrrrrrrrrrrrrrrrr");
    res.render('error', { title: 'Express' });
};