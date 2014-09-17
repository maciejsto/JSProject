
/*

 */
"use strict";
//about route
exports.about = {

    //public function
    showUserData: function(model){

       return function (req, res){
           model(function(err, user){

               user.get('testC',function(err, data){

                   var listOfObjects = data;
                   var ObjectsAsString = [];

                   listOfObjects.forEach(function(item){
                       var string_item = JSON.stringify(item);
                       ObjectsAsString.push(string_item);
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

    //public function
    dummyFunction: function(req, res){
        res.render('about', {
            title: 'Express',
            user: "Maciek"

        });
    }
};

//for test purpose
exports.list = function(req, res, next){
    //req.db.find().toArray(function(error, users){
    //    if (error) return next(error);
        res.render('about', {
            title: 'Expresss List',
            //user: users || []
            user: {
                name: "test name"
            }
        });
    //});
    next();
};