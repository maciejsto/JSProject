{"changed":true,"filter":false,"title":"web.js","tooltip":"/web.js","value":"'use strict';\nrequire('newrelic');\nvar services     = require(\"./src/backend/config/serviceConfig\").services;\nvar sm           = require(\"./src/backend/service/manager\")(services);\nvar app          = sm.get('app');\nvar fs           = sm.get('fs');\nvar usersModel   = sm.get('users');\n//var serialPort   = sm.get('serial')(sm.get('config').Serial.port);  //COM3\nvar arduinoModel = sm.get('arduinomodel');\nvar routes       = sm.get('routes');\nvar server       = sm.get('httpServer');\nvar io           = sm.get('io')(server);\nvar port         = sm.get('config').port;\nvar MongoClient  = sm.get('mongoClient');\nvar when         = sm.get('when');\n\n\nvar promise = when.promise(function(resolve, reject, notify){\n   //do something async\n    var db = sm.get('mongoose').connect(sm.get('config').mongoDb.uri, function(){\n        console.log('mongoose db connection established, db: ',sm.get('config').mongoDb.uri);\n    });\n   \n});\n\n\n\nvar controllers  = [];                      //global variables holding list of controllers files\nvar clients      = [];\n\n\napp.use(function(req, res , next){\n    req.db = db;\n});\n\n\n/*\nvar mongoClient = sm.get('mongo').MongoClient;\nmongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db){\n    console.log('connected.. with mongoClinet to local db..');\n});\n*/\n\n/*******************************loading controllers names from directory into array*/ //TODO refactor to imediatelly invoke controller \nfs.readdirSync('./src/backend/controllers').forEach(function (file) {\n    if (file.substr(-3) === '.js') {\n        console.log(\"controller:\", file);\n        controllers.push(file);\n    }\n});\n\n/******************************calling particular controllers*******************************************/\n<<<<<<< HEAD\nvar userController = require('./src/backend/controllers/' + controllers[4]);\nvar arduinoController = require('./src/backend/controllers/' + controllers[2]);\n=======\nvar BaseController = require('./src/backend/controllers/' + controllers[3]);\nvar userController = require('./src/backend/controllers/' + controllers[4]);\nvar arduinoController = require('./src/backend/controllers/' + controllers[1]);\n>>>>>>> 0f09b80891769c83de34ee0721b097bf97e8cf79\nvar AdminController = require('./src/backend/controllers/'+ controllers[0]);\nvar astronautsController = require('./src/backend/controllers/' + controllers[3]);\nconsole.log(controllers);\n\n/*calling methods on controllers*/\n//userController.controller(app, usersModel, io);\n<<<<<<< HEAD\narduinoController.setDebug(true);\narduinoController.run(app, arduinoModel , io);\n\nconsole.log(\"controller name: \",arduinoController.getName());\nastronautsController().setDebug(true);\nastronautsController().run(app);\n=======\n//arduinoController.run(app, arduinoModel, io);\n//arduinoController.setDebug(true);\n//console.log(\"controller name: \",arduinoController.getName());\n//astronautsController().setDebug(true);\n//astronautsController().run(app);\n>>>>>>> 0f09b80891769c83de34ee0721b097bf97e8cf79\n//console.log(astronautsController.getName());\n//astronautsController.setDebug(true);\n\n\n/*****using socket to receive request from browser , process it , send to client(raspberry) and receive response********/\nio.on('connection', function (socket) {\n    socket.setMaxListeners(0);\n    console.log('client connected in web.js');\n    clients.push(socket);\n    var i = clients.indexOf(socket);\n    console.log(\"socketID:\",clients[i].id);\n    \n        /*wait for button state change True/False*/\n        socket.on('stateChanged', function(data){\n            console.log('state changed '+ data.state);\n\n            socket.broadcast.emit('updateState',{data: data});\n            //socket.emit('updateState', {data:'new_state'});\n        });\n\n        /*do something on client event*/    \n        socket.on('client', function(data){\n            console.log('form client:', data);\n            socket.emit('server', {data: 'data from server'});\n        });\n        \n        /*do task on disconnect*/\n        socket.on('disconnect', function(socket){\n            \n            while(clients.length > 0){\n                clients[i] = null;\n                clients.pop();\n            }\n            console.log('client disconnecting from server', clients);\n            \n        });\n        \n        //TODO other tasks\n});\n\n\n    /*\n    socket.on('myevent', function(data){\n        setTimeout(function(){\n            var data = arduinoModel.getSerialData();\n            socket.emit('message', {data: 'echo message'});\n            //socket.emit('message', {data: JSON.stringify(data[0])});\n        },1000);\n\n    });\n    */\n\n/*******************working with serialport**********************************/\n/*\nserialPort.on('open',function() {\n console.log('serialport opened');\n serialPort.on('data', function (data) {\n console.log(data);\n });\n        console.log('port opened');\n        arduinoModel.getSerialData(function(data){\n            console.log('inside arduino callback');\n            //socket.emit('serialData', {message: data});\n        });\n    });\n\n\n});\n*/\n\n/*console loggin data on every request ex. page reload*/\napp.use(function(req,res,next){\n    console.log('something happening here');\n    next();\n});\n\n//ENVIRONMET SETTINGS\nvar env = process.env.NODE_ENV || 'development';\nif ('development' === env) {\n    // configure stuff here\n    console.log('configure stuff here..');\n}\n//APP SETTINGS//\napp.set('views', __dirname + '/src/front/views');\napp.set('view engine', 'ejs');\n\n//ROUTES//\napp.route('/')\n    .get(routes.index);\n\napp.route('/index')\n    .get(routes.index);\n\napp.route('/about')\n    .get(routes.about.dummyFunction);\n    //app.get('/arduino', routes.arduino);\n    //app.get('*', routes.error);\n\napp.all(\"/admin*\", function(req,res,next){\n    AdminController.run(req,res,next);\n});\n\n/*\napp.all('/users*', function(req,res,next){\n    //userController.run(req,res,next,MongoClient);\n});\n*/\n\n//console.log('name of Admin Controller: ',AdminController.name);\n\n//START SERVER ON DEDICATED PORT//\nserver.listen(process.env.PORT || port, function(){\n    console.log(\"http server listening on port: \",server.address().port, server.address().address);\n});\n\n\n\n\n\n\n/*********  working with Promises  ********************\n\nvar f = function(state){\n        return state;\n};\n\n\nvar promise = when.promise(function(resolve, reject, notify){\n\n    //do something async\n    var result = f('false');\n    try {\n        if (result === 'true') {\n            resolve(result);\n        }else{\n            reject(result);\n        }\n    }catch(e){\n        //catch other error\n        reject(e);\n    }\n\n});\nvar fulfiled = function(value){\n    console.log('fulfilled: ',value);\n};\nvar rejected = function(err){\n    console.log('called on rejected: ',err);\n};\nvar followingpromise = promise\n    .then(function(data){\n        console.log('fulfiled: ',data);\n    })\n    /*\n    .catch(function(err){\n        console.log('rejected: ',err);\n    });\n    \n    .catch(function(err){\n        rejected(err);\n    });\n*/\n","undoManager":{"mark":99,"position":100,"stack":[[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":28},"end":{"row":16,"column":29}},"text":"u"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":29},"end":{"row":16,"column":30}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":30},"end":{"row":16,"column":31}},"text":"c"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":31},"end":{"row":16,"column":32}},"text":"t"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":32},"end":{"row":16,"column":33}},"text":"i"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":33},"end":{"row":16,"column":34}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":34},"end":{"row":16,"column":35}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":35},"end":{"row":16,"column":37}},"text":"()"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":36},"end":{"row":16,"column":37}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":37},"end":{"row":16,"column":38}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":38},"end":{"row":16,"column":39}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":39},"end":{"row":16,"column":40}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":40},"end":{"row":16,"column":41}},"text":"l"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":41},"end":{"row":16,"column":42}},"text":"v"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":42},"end":{"row":16,"column":43}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":43},"end":{"row":16,"column":44}},"text":","}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":44},"end":{"row":16,"column":45}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":45},"end":{"row":16,"column":46}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":46},"end":{"row":16,"column":47}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":47},"end":{"row":16,"column":48}},"text":"j"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":48},"end":{"row":16,"column":49}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":49},"end":{"row":16,"column":50}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":16,"column":49},"end":{"row":16,"column":50}},"text":"s"},{"action":"insertText","range":{"start":{"row":16,"column":49},"end":{"row":16,"column":50}},"text":"c"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":50},"end":{"row":16,"column":51}},"text":"t"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":51},"end":{"row":16,"column":52}},"text":","}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":52},"end":{"row":16,"column":53}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":53},"end":{"row":16,"column":54}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":54},"end":{"row":16,"column":55}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":55},"end":{"row":16,"column":56}},"text":"t"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":56},"end":{"row":16,"column":57}},"text":"i"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":57},"end":{"row":16,"column":58}},"text":"f"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":58},"end":{"row":16,"column":59}},"text":"y"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":60},"end":{"row":16,"column":62}},"text":"{}"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":61},"end":{"row":17,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":17,"column":0},"end":{"row":18,"column":0}},"lines":["    "]}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":18,"column":2},"end":{"row":18,"column":3}},"text":";"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":3},"end":{"row":17,"column":4}},"text":"/"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":4},"end":{"row":17,"column":5}},"text":"/"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":5},"end":{"row":17,"column":6}},"text":"d"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":6},"end":{"row":17,"column":7}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":7},"end":{"row":17,"column":8}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":8},"end":{"row":17,"column":9}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":9},"end":{"row":17,"column":10}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":10},"end":{"row":17,"column":11}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":11},"end":{"row":17,"column":12}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":12},"end":{"row":17,"column":13}},"text":"t"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":13},"end":{"row":17,"column":14}},"text":"h"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":14},"end":{"row":17,"column":15}},"text":"i"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":15},"end":{"row":17,"column":16}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":16},"end":{"row":17,"column":17}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":17},"end":{"row":17,"column":18}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":18},"end":{"row":17,"column":19}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":19},"end":{"row":17,"column":20}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":20},"end":{"row":17,"column":21}},"text":"y"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":21},"end":{"row":17,"column":22}},"text":"n"},{"action":"insertText","range":{"start":{"row":17,"column":22},"end":{"row":17,"column":23}},"text":"c"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":17,"column":23},"end":{"row":17,"column":24}},"text":" "},{"action":"insertText","range":{"start":{"row":17,"column":23},"end":{"row":18,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":18,"column":0},"end":{"row":18,"column":3}},"text":"   "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":19,"column":3},"end":{"row":20,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":18,"column":3},"end":{"row":18,"column":4}},"text":"v"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":18,"column":4},"end":{"row":18,"column":5}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":18,"column":5},"end":{"row":18,"column":6}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":18,"column":6},"end":{"row":18,"column":7}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":18,"column":7},"end":{"row":18,"column":8}},"text":"d"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":18,"column":8},"end":{"row":18,"column":9}},"text":"b"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":18,"column":9},"end":{"row":18,"column":10}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":18,"column":10},"end":{"row":18,"column":11}},"text":"="}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":18,"column":11},"end":{"row":18,"column":12}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":11},"end":{"row":18,"column":12}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":10},"end":{"row":18,"column":11}},"text":"="}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":9},"end":{"row":18,"column":10}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":8},"end":{"row":18,"column":9}},"text":"b"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":7},"end":{"row":18,"column":8}},"text":"d"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":6},"end":{"row":18,"column":7}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":5},"end":{"row":18,"column":6}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":4},"end":{"row":18,"column":5}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":3},"end":{"row":18,"column":4}},"text":"v"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":23,"column":0},"end":{"row":23,"column":3}},"text":"});"},{"action":"removeLines","range":{"start":{"row":21,"column":0},"end":{"row":23,"column":0}},"nl":"\n","lines":["var db           = sm.get('mongoose').connect(sm.get('config').mongoDb.uri, function(){","    console.log('mongoose db connection established, db: ',sm.get('config').mongoDb.uri);"]}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":23},"end":{"row":18,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":18,"column":0},"end":{"row":18,"column":3}},"text":"   "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":18,"column":3},"end":{"row":18,"column":90}},"text":"var db           = sm.get('mongoose').connect(sm.get('config').mongoDb.uri, function(){"},{"action":"insertText","range":{"start":{"row":18,"column":90},"end":{"row":19,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":19,"column":0},"end":{"row":20,"column":0}},"lines":["    console.log('mongoose db connection established, db: ',sm.get('config').mongoDb.uri);"]},{"action":"insertText","range":{"start":{"row":20,"column":0},"end":{"row":20,"column":3}},"text":"});"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":16},"end":{"row":18,"column":20}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":12},"end":{"row":18,"column":16}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":11},"end":{"row":18,"column":12}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":10},"end":{"row":18,"column":11}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":9},"end":{"row":18,"column":10}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":18,"column":9},"end":{"row":18,"column":10}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":20,"column":0},"end":{"row":20,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":20,"column":0},"end":{"row":20,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":20,"column":0},"end":{"row":20,"column":1}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":20,"column":1},"end":{"row":20,"column":2}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":20,"column":2},"end":{"row":20,"column":3}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":19,"column":0},"end":{"row":19,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":19,"column":0},"end":{"row":19,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":19,"column":0},"end":{"row":19,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":19,"column":0},"end":{"row":19,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":18,"column":3},"end":{"row":18,"column":4}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":20,"column":3},"end":{"row":20,"column":4}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":19,"column":4},"end":{"row":19,"column":8}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":19,"column":8},"end":{"row":19,"column":9}},"text":"S"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":19,"column":8},"end":{"row":19,"column":9}},"text":"S"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":60,"column":41},"end":{"row":60,"column":42}},"text":"b"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":60,"column":40},"end":{"row":60,"column":41}},"text":"d"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":60,"column":39},"end":{"row":60,"column":40}},"text":","}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":0,"column":0},"end":{"row":0,"column":2}},"text":"//"},{"action":"insertText","range":{"start":{"row":1,"column":0},"end":{"row":1,"column":20}},"text":"require('newrelic');"},{"action":"insertText","range":{"start":{"row":1,"column":20},"end":{"row":2,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":52,"column":0},"end":{"row":52,"column":12}},"text":"<<<<<<< HEAD"},{"action":"insertText","range":{"start":{"row":52,"column":12},"end":{"row":53,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":55,"column":0},"end":{"row":55,"column":7}},"text":"======="},{"action":"insertText","range":{"start":{"row":55,"column":7},"end":{"row":56,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":56,"column":0},"end":{"row":60,"column":0}},"lines":["var BaseController = require('./src/backend/controllers/' + controllers[3]);","var userController = require('./src/backend/controllers/' + controllers[4]);","var arduinoController = require('./src/backend/controllers/' + controllers[1]);",">>>>>>> 0f09b80891769c83de34ee0721b097bf97e8cf79"]},{"action":"insertText","range":{"start":{"row":66,"column":0},"end":{"row":66,"column":12}},"text":"<<<<<<< HEAD"},{"action":"insertText","range":{"start":{"row":66,"column":12},"end":{"row":67,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":73,"column":0},"end":{"row":73,"column":7}},"text":"======="},{"action":"insertText","range":{"start":{"row":73,"column":7},"end":{"row":74,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":74,"column":0},"end":{"row":80,"column":0}},"lines":["//arduinoController.run(app, arduinoModel, io);","//arduinoController.setDebug(true);","//console.log(\"controller name: \",arduinoController.getName());","//astronautsController().setDebug(true);","//astronautsController().run(app);",">>>>>>> 0f09b80891769c83de34ee0721b097bf97e8cf79"]},{"action":"insertText","range":{"start":{"row":158,"column":20},"end":{"row":158,"column":21}},"text":"="},{"action":"insertText","range":{"start":{"row":180,"column":3},"end":{"row":181,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":181,"column":0},"end":{"row":182,"column":0}},"lines":[""]},{"action":"insertText","range":{"start":{"row":182,"column":0},"end":{"row":182,"column":2}},"text":"/*"},{"action":"insertText","range":{"start":{"row":184,"column":4},"end":{"row":184,"column":6}},"text":"//"},{"action":"insertText","range":{"start":{"row":185,"column":3},"end":{"row":186,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":186,"column":0},"end":{"row":186,"column":2}},"text":"*/"}]}]]},"ace":{"folds":[],"scrolltop":372,"scrollleft":0,"selection":{"start":{"row":85,"column":39},"end":{"row":85,"column":39},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":25,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1415615725998}