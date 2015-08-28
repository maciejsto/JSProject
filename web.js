'use strict';

var services     = require("./src/backend/config/serviceConfig").services,
    sm           = require("./src/backend/service/manager")(services);

var app          = sm.get('app'),
    cluster      = sm.get('cluster'),
    fs           = sm.get('fs'),
    //var User         = sm.get('users');
    bodyParser   = require('body-parser'),
    mongoose     = sm.get('mongoose'),
    User         = require("./src/backend/models/user"),
    Beer         = require('./src/backend/models/beer'),
    //var serialPort = sm.get('serial')(sm.get('config').Serial.port);  //COM3
    arduinoModel = sm.get('arduinomodel'),
    routes       = sm.get('routes'),
    server       = sm.get('httpServer'),
    io           = sm.get('io'),
    port         = sm.get('config').port,
    MongoClient  = sm.get('mongoClient'),
    when         = sm.get('when'),
    express      = sm.get('express'),
    session      = require('express-session'),
    flash        = require('connect-flash'),
    path         = require('path');


//------------------------------------------------ GLOBAL VARIABLES--------------------------------------------------*/
// var controllers  = [], 
    // clients      = [];

//------------------------------------------------ PASSPORT AUTH SETTINGS -----------------------------------//

var passport     = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    require("./src/backend/config/passport")(passport);


//-------------------------------------------------DATABASE CONNECTION-----------------------------------//
mongoose.connect(sm.get('config').mongoDb.uri);
var db = mongoose.connection;

db.on('error', function () {
  throw new Error('unable to connect to database at ' + sm.get('config').mongoDb.uri);
});    
    
//----------------------------------------------------APP SETTINGS------------------------------------------//
app.set('views', __dirname + '/src/front/views');
app.use('/api',express.static(__dirname + '/src/front'));   
// app.use('/views', express.static(__dirname + '/src/front/views'));
app.set('view engine', 'ejs');

// TODO to be removed    
// fs.readdirSync('./src/backend/controllers').forEach(function (file) {   //TODO get rid of sync
    // if (file.substr(-3) === '.js') {
        // console.log("controller:", file);
        // var name = file.substr(0,file.length - 3);
        // controllers[name] = {name: name, value: require('./src/backend/controllers/'+ file)};
        //controllers[name].run();
    // }
    
// });    

// //----------------------------------------------- SOCKETS -----------------------------------------------//
require('./src/backend/sockets.js')(io(server));

//---------------------------------------------------ENVIRONMET SETTINGS--------------------------------------------------------//
var env = process.env.NODE_ENV || 'development';
if ('development' === env) {
    // configure stuff here
    console.log('configure stuff here..');
}
//---------------------------------------------------CONTROLLERS-----------------------------------------------------------------//

var authController    = require('./src/backend/controllers/auth'),
    beerController    = require('./src/backend/controllers/beer'),
    userController    = require('./src/backend/controllers/users'),
    todoController    = require('./src/backend/controllers/todo'),
    arduinoController = require('./src/backend/controllers/arduino');
    

// var ardu = arduinoController();
// console.log(ardu.getName());
//ROUTES-------------------------------------------TODO move to controlleers-------------------------------------------------//

/*    
app.all('/users*', function(req,res,next){
    //userController.run(req,res,next,MongoClient);
});
*/

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
   req.session.messages = "You need to login to view this page";
   res.redirect('/api/login');
}

  // route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/api/login');
}

var router = express.Router();


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/about')
    .get(ensureAuthenticated, routes.about.dummyFunction);
//     //.get(routes.about.dummyFunction) ...


router.route('/admin')
     .get(ensureAuthenticated, routes.admin);
     ////adminController().run(req,res,next);
    
router.route('/home')
    .get(ensureAuthenticated, routes.home);
    // .get(ensureAuthenticated, function(req, res, next){
    //   res.render('home', {title: 'home route'}); 
    // });
    
 router.route('/arduino')
     .get(ensureAuthenticated, routes.arduino);
     

 router.route('/portfolio')
     .get(ensureAuthenticated, routes.portfolio);

// router.route('/projects')
    // .get(ensureAuthenticated, function(req, res, next){
    //   res.render('projects', {title: 'projects route'}); 
    // });
    
 router.get('/angular',ensureAuthenticated, function(req,res){
     User.find(function(err, users){
       if (err)
             res.send(err);
             console.log(users);
       res.json(users);
     });
 });


router.route('/login')
    .get(routes.login);
    
router.route('/signup')
    .get(routes.signup);    
    
router.route('/login')
    .get(routes.login)
    .post(passport.authenticate('local-login', { 
        successRedirect: '/api/index',
        failureRedirect: '/api/login' }));
    

// // process the signup form
// router.route('/signup')
    //  .post(passport.authenticate('local-signup', {
        //  successRedirect : '/arduino', // redirect to the secure profile section
        //  failureRedirect : '/signup', // redirect back to the signup page if there is an error
        //  failureFlash : true // allow flash messages
    //  }));


router.route('/index')
    .get(ensureAuthenticated, routes.index);
//     .get(function(req,res){
//         res.json("index page");
//     })

// // Create endpoint handlers for /beers
router.route('/beers')
  .post(ensureAuthenticated, beerController.postBeers)
  .get( ensureAuthenticated, beerController.getBeers);

// // Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);

// Create endpoint handlers for /users
router.route('/users')
  .post( ensureAuthenticated, userController.postUsers)
  .get( ensureAuthenticated,userController.getUsers);

//create endpoint handlers for /users/:user_id 
router.route('/users/:user_id')
    .get(authController.isAuthenticated, userController.getUser)
    .put(authController.isAuthenticated, userController.putUser)
    .delete(authController.isAuthenticated, userController.deleteUser);

// //create endpoint handlers for /todo  
// router.route('/todos')
//     .post(ensureAuthenticated, todoController.postTodo)
//     .get(ensureAuthenticated, todoController.getTodos);

router.route('/logout')
    .get(function(req, res) {
        console.log('logging out');
        req.logout();
        res.redirect('/api/login');
    });

router.route('/*')
    .get(function(req, res){
         res.redirect('/api/index');
    });

// =====================================
// TWITTER ROUTES ======================
// =====================================
// route for twitter authentication and login
router.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

// handle the callback after twitter has authenticated the user
router.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
            successRedirect : '/api/home',
            failureRedirect : '/api/login'
    }));
    



// application -------------------------------------------------------------
router.route('*')
    .get( function(req, res) {
	//res.sendFile(__dirname +'/'+ 'app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    res.render(__dirname +'/'+ 'src/front/views/index.ejs'); // load the single view file (angular will handle the page changes on the front-end)
    
});

app.use('/api', router);


    app.use(function(req, res, next){
  res.status(404);
  
  // respond with html page
  if (req.accepts('html')) {
    // res.render('login', { url: req.url });
     res.redirect('/api/login');
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
}); 

app.use(function(err, req, res, next){
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.render('500', { error: err });
});

//--------------------------------START SERVER ON DEDICATED PORT---------------------------------------------//
server.listen(process.env.PORT, process.env.IP,function(){
    console.log("http server listening on port: ",server.address().port, server.address().address);
});









    





/*******************working with serialport**********************************/
/*
serialPort.on('open',function() {
 console.log('serialport opened');
 serialPort.on('data', function (data) {
 console.log(data);
 });
        console.log('port opened');
        arduinoModel.getSerialData(function(data){
            console.log('inside arduino callback');
            //socket.emit('serialData', {message: data});
        });
    });


});
*/

/*********  working with Promises  ********************

var f = function(state){
        return state;
};


var promise = when.promise(function(resolve, reject, notify){

    //do something async
    var result = f('false');
    try {
        if (result === 'true') {
            resolve(result);
        }else{
            reject(result);
        }
    }catch(e){
        //catch other error
        reject(e);
    }

});
var fulfiled = function(value){
    console.log('fulfilled: ',value);
};
var rejected = function(err){
    console.log('called on rejected: ',err);
};
var followingpromise = promise
    .then(function(data){
        console.log('fulfiled: ',data);
    })
    /*
    .catch(function(err){
        console.log('rejected: ',err);
    });
    
    .catch(function(err){
        rejected(err);
    });
*/
