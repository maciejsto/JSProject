'use strict';

var services     = require("./src/backend/config/serviceConfig").services,
    sm           = require("./src/backend/service/manager")(services);

var app          = sm.get('app'),
    cluster      = sm.get('cluster'),
    fs           = sm.get('fs'),
    //var User         = sm.get('users');
    bodyParser   = require('body-parser'),
    User         = require("./src/backend/models/user"),
    Beer         = require('./src/backend/models/beer'),
    //var serialPort = sm.get('serial')(sm.get('config').Serial.port);  //COM3
    arduinoModel = sm.get('arduinomodel'),
    routes       = sm.get('routes'),
    server       = sm.get('httpServer'),
    io           = sm.get('io')(server),
    port         = sm.get('config').port,
    MongoClient  = sm.get('mongoClient'),
    when         = sm.get('when'),
    express      = sm.get('express'),
    session      = require('express-session'),
    flash        = require('connect-flash'),
    path         = require('path');


//------------------------------------------------ GLOBAL VARIABLES--------------------------------------------------*/
var controllers  = [], 
    clients      = [];

//------------------------------------------------ PASSPORT AUTH SETTINGS -----------------------------------//

//passport configuration
var passport     = require('passport')
, LocalStrategy = require('passport-local').Strategy;

require("./src/backend/config/passport")(passport);
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//-------------------------------------------------DATABASE CONNECTION-----------------------------------//
var db = sm.get('mongoose').connect(sm.get('config').mongoDb.uri);
    

//----------------------------------------------------APP SETTINGS------------------------------------------//
app.set('views', __dirname + '/src/front/views');
app.use(express.static(__dirname + '/src/front'));   
app.set('view engine', 'ejs');

    
fs.readdirSync('./src/backend/controllers').forEach(function (file) {   //TODO get rid of sync
    if (file.substr(-3) === '.js') {
        console.log("controller:", file);
        var name = file.substr(0,file.length - 3);
        controllers[name] = {name: name, value: require('./src/backend/controllers/'+ file)};
        //controllers[name].run();
    }
    
});    

//----------------------------------------------- SOCKETS -----------------------------------------------//

/* ****using socket to receive request from browser , process it , send to client(raspberry) and receive response*******  */
io.on('connection', function (socket) {
    socket.setMaxListeners(0);
    console.log('client connected in web.js');
    clients.push(socket);
    var i = clients.indexOf(socket);
    console.log("socketID:",clients[i].id);
    
        /*wait for button state change True/False*/
        socket.on('stateChanged', function(data){
            console.log('state changed '+ data.state);

            socket.broadcast.emit('updateState',{data: data});
            //socket.emit('updateState', {data:'new_state'});
        });

        /*do something on client event*/    
        socket.on('client', function(data){
            console.log('form client:', data);
            socket.emit('server', {data: 'data from server'});
        });
        
        /*do task on disconnect*/
        socket.on('disconnect', function(socket){
            
            while(clients.length > 0){
                clients[i] = null;
                clients.pop();
            }
            console.log('client disconnecting from server', clients);
            
        });
        
        //TODO other tasks
});


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


var ardu = arduinoController();
console.log(ardu.getName());
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


router.route('/about')
    .get(ensureAuthenticated, routes.about.dummyFunction);
    //.get(routes.about.dummyFunction) ...

router.route('/admin')
    .get(ensureAuthenticated, routes.admin);
    ////adminController().run(req,res,next);
    
router.route('/arduino')
    .get(ensureAuthenticated, routes.arduino);

router.route('/portfolio')
    .get(ensureAuthenticated, routes.portfolio);

router.get('/angular',ensureAuthenticated, function(req,res){
    User.find(function(err, users){
       if (err)
            res.send(err);
            console.log(users);
       res.json(users);
    });
});
    
router.route('/login')
    .get(routes.login)
    .post(passport.authenticate('local-login', { 
        successRedirect: '/api/index',
        failureRedirect: '/api/login' }));
        

// process the signup form
router.route('/signup')
    .post(passport.authenticate('local-signup', {
        successRedirect : '/index', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


router.route('/index')
     .get(ensureAuthenticated, routes.index);


// Create endpoint handlers for /beers
router.route('/beers')
  .post(ensureAuthenticated, beerController.postBeers)
  .get( ensureAuthenticated, beerController.getBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);

// Create endpoint handlers for /users
router.route('/users')
  .post(ensureAuthenticated, userController.postUsers)
  .get(ensureAuthenticated, userController.getUsers);

//create endpoint handlers for /users/:user_id 
router.route('/users/:user_id')
    .get(authController.isAuthenticated, userController.getUser)
    .put(authController.isAuthenticated, userController.putUser)
    .delete(authController.isAuthenticated, userController.deleteUser);

//create endpoint handlers for /todo  
router.route('/todos')
    .post(ensureAuthenticated, todoController.postTodo)
    .get(ensureAuthenticated, todoController.getTodos);

router.route('/logout')
    .get(function(req, res) {
        req.logout();
        res.redirect('/api/login');
    });

router.route('/')
    .get(routes.login);

// Register all our routes with /api
app.use('/api', router);

app.use(function(req, res, next){
  // the status option, or res.statusCode = 404
  // are equivalent, however with the option we
  // get the "status" local available as well
  res.render('404', { status: 404, url: req.url });
});

app.use(function(err, req, res, next){
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.render('500', {
      status: err.status || 500
    , error: err
  });
});    



// application -------------------------------------------------------------
app.get('*', function(req, res) {
	res.sendfile('./public/index2.ejs'); // load the single view file (angular will handle the page changes on the front-end)
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
