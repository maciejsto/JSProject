
/*

 */
"use strict";

module.exports.about = {
    showUserData: function(model){

       return function (req, res){
           model(function(err, user){

               user.get('testC',function(err, data){

                   var listOfObjects = data;
                   var ObjectsAsString = [];

                   listOfObjects.forEach(function(item){
                       var itemString = JSON.stringify(item);
                       ObjectsAsString.push(itemString);
                   });
                   res.render('about',{
                       title: 'Express',
                       //user: JSON.stringify(ObjectsAsString[0])
                       user: data[0]
                   });
               });
           });
       };
    },

    dummyFunction: function(req, res){
        res.render('about', {
            title: 'Express',
            user: "Maciek"

        });
    }
};

exports.list = function(req, res, next){
    //req.db.find().toArray(function(error, users){
    //    if (error) return next(error);
        res.render('about', {
            title: 'Expresss',
            //user: users || []
            user: {
                name: "test name"
            }
        });
    //});
    next();
};
