/**
 * Created by Maciej on 6/16/2014.
 */

//error route
exports.error = function(req, res){
    //res.send("Fucnking errorrrrrrrrrrrrrrrrrrrrr");   // ok
    res.render('error', { title: 'Express' });          // also ok

};