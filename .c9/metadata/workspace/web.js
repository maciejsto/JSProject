{"changed":false,"filter":false,"title":"web.js","tooltip":"/web.js","undoManager":{"mark":100,"position":100,"stack":[[{"start":{"row":268,"column":18},"end":{"row":268,"column":19},"action":"remove","lines":["p"],"id":8315}],[{"start":{"row":268,"column":17},"end":{"row":268,"column":18},"action":"remove","lines":["a"],"id":8316}],[{"start":{"row":268,"column":16},"end":{"row":268,"column":17},"action":"remove","lines":["/"],"id":8317}],[{"start":{"row":268,"column":16},"end":{"row":268,"column":17},"action":"insert","lines":["o"],"id":8318}],[{"start":{"row":268,"column":16},"end":{"row":268,"column":17},"action":"remove","lines":["o"],"id":8319}],[{"start":{"row":268,"column":16},"end":{"row":268,"column":17},"action":"insert","lines":["l"],"id":8320}],[{"start":{"row":268,"column":17},"end":{"row":268,"column":18},"action":"insert","lines":["o"],"id":8321}],[{"start":{"row":268,"column":18},"end":{"row":268,"column":19},"action":"insert","lines":["g"],"id":8322}],[{"start":{"row":268,"column":19},"end":{"row":268,"column":20},"action":"insert","lines":["n"],"id":8323}],[{"start":{"row":268,"column":19},"end":{"row":268,"column":20},"action":"remove","lines":["n"],"id":8324}],[{"start":{"row":268,"column":19},"end":{"row":268,"column":20},"action":"insert","lines":["i"],"id":8325}],[{"start":{"row":268,"column":20},"end":{"row":268,"column":21},"action":"insert","lines":["n"],"id":8326}],[{"start":{"row":268,"column":42},"end":{"row":269,"column":0},"action":"insert","lines":["",""],"id":8327},{"start":{"row":269,"column":0},"end":{"row":269,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":269,"column":4},"end":{"row":269,"column":32},"action":"insert","lines":[" res.redirect('/api/login');"],"id":8328}],[{"start":{"row":268,"column":4},"end":{"row":268,"column":7},"action":"insert","lines":["// "],"id":8329}],[{"start":{"row":281,"column":4},"end":{"row":281,"column":5},"action":"remove","lines":[" "],"id":8330},{"start":{"row":281,"column":4},"end":{"row":282,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":282,"column":0},"end":{"row":283,"column":0},"action":"insert","lines":["",""],"id":8331}],[{"start":{"row":283,"column":0},"end":{"row":284,"column":0},"action":"insert","lines":["",""],"id":8332}],[{"start":{"row":283,"column":0},"end":{"row":289,"column":3},"action":"insert","lines":["app.use(function(err, req, res, next){","  // we may use properties of the error object","  // here and next(err) appropriately, or if","  // we possibly recovered from the error, simply next().","  res.status(err.status || 500);","  res.render('500', { error: err });","});"],"id":8333}],[{"start":{"row":165,"column":2},"end":{"row":165,"column":3},"action":"remove","lines":[" "],"id":8334}],[{"start":{"row":165,"column":1},"end":{"row":165,"column":2},"action":"remove","lines":["/"],"id":8335}],[{"start":{"row":165,"column":0},"end":{"row":165,"column":1},"action":"remove","lines":["/"],"id":8336}],[{"start":{"row":166,"column":6},"end":{"row":166,"column":7},"action":"remove","lines":[" "],"id":8337}],[{"start":{"row":166,"column":5},"end":{"row":166,"column":6},"action":"remove","lines":["/"],"id":8338}],[{"start":{"row":166,"column":4},"end":{"row":166,"column":5},"action":"remove","lines":["/"],"id":8339}],[{"start":{"row":170,"column":3},"end":{"row":170,"column":4},"action":"insert","lines":["]"],"id":8340}],[{"start":{"row":170,"column":4},"end":{"row":170,"column":5},"action":"insert","lines":["]"],"id":8341}],[{"start":{"row":170,"column":4},"end":{"row":170,"column":5},"action":"remove","lines":["]"],"id":8342}],[{"start":{"row":170,"column":3},"end":{"row":170,"column":4},"action":"remove","lines":["]"],"id":8343}],[{"start":{"row":170,"column":2},"end":{"row":170,"column":3},"action":"remove","lines":[" "],"id":8344}],[{"start":{"row":170,"column":1},"end":{"row":170,"column":2},"action":"remove","lines":["/"],"id":8345}],[{"start":{"row":170,"column":0},"end":{"row":170,"column":1},"action":"remove","lines":["/"],"id":8346}],[{"start":{"row":171,"column":1},"end":{"row":171,"column":2},"action":"remove","lines":["/"],"id":8347}],[{"start":{"row":171,"column":0},"end":{"row":171,"column":1},"action":"remove","lines":["/"],"id":8348}],[{"start":{"row":172,"column":1},"end":{"row":172,"column":2},"action":"remove","lines":["/"],"id":8349}],[{"start":{"row":172,"column":0},"end":{"row":172,"column":1},"action":"remove","lines":["/"],"id":8350}],[{"start":{"row":174,"column":1},"end":{"row":174,"column":2},"action":"remove","lines":["/"],"id":8351}],[{"start":{"row":174,"column":0},"end":{"row":174,"column":1},"action":"remove","lines":["/"],"id":8352}],[{"start":{"row":175,"column":1},"end":{"row":175,"column":2},"action":"remove","lines":["/"],"id":8353}],[{"start":{"row":175,"column":0},"end":{"row":175,"column":1},"action":"remove","lines":["/"],"id":8354}],[{"start":{"row":177,"column":1},"end":{"row":177,"column":2},"action":"remove","lines":["/"],"id":8355}],[{"start":{"row":177,"column":0},"end":{"row":177,"column":1},"action":"remove","lines":["/"],"id":8356}],[{"start":{"row":178,"column":1},"end":{"row":178,"column":2},"action":"remove","lines":["/"],"id":8357}],[{"start":{"row":178,"column":0},"end":{"row":178,"column":1},"action":"remove","lines":["/"],"id":8358}],[{"start":{"row":180,"column":1},"end":{"row":180,"column":2},"action":"remove","lines":["/"],"id":8359}],[{"start":{"row":180,"column":0},"end":{"row":180,"column":1},"action":"remove","lines":["/"],"id":8360}],[{"start":{"row":181,"column":1},"end":{"row":181,"column":2},"action":"remove","lines":["/"],"id":8361}],[{"start":{"row":181,"column":0},"end":{"row":181,"column":1},"action":"remove","lines":["/"],"id":8362}],[{"start":{"row":180,"column":0},"end":{"row":180,"column":1},"action":"insert","lines":["/"],"id":8363}],[{"start":{"row":180,"column":1},"end":{"row":180,"column":2},"action":"insert","lines":["/"],"id":8364}],[{"start":{"row":181,"column":0},"end":{"row":181,"column":1},"action":"insert","lines":["/"],"id":8365}],[{"start":{"row":181,"column":1},"end":{"row":181,"column":2},"action":"insert","lines":["/"],"id":8366}],[{"start":{"row":180,"column":2},"end":{"row":180,"column":3},"action":"insert","lines":["="],"id":8367}],[{"start":{"row":180,"column":2},"end":{"row":180,"column":3},"action":"remove","lines":["="],"id":8368}],[{"start":{"row":180,"column":1},"end":{"row":180,"column":2},"action":"remove","lines":["/"],"id":8369}],[{"start":{"row":180,"column":0},"end":{"row":180,"column":1},"action":"remove","lines":["/"],"id":8370}],[{"start":{"row":181,"column":1},"end":{"row":181,"column":2},"action":"remove","lines":["/"],"id":8371}],[{"start":{"row":181,"column":0},"end":{"row":181,"column":1},"action":"remove","lines":["/"],"id":8372}],[{"start":{"row":182,"column":1},"end":{"row":182,"column":2},"action":"remove","lines":["/"],"id":8373}],[{"start":{"row":182,"column":0},"end":{"row":182,"column":1},"action":"remove","lines":["/"],"id":8374}],[{"start":{"row":183,"column":0},"end":{"row":183,"column":1},"action":"remove","lines":["/"],"id":8375}],[{"start":{"row":183,"column":0},"end":{"row":183,"column":1},"action":"remove","lines":["/"],"id":8378}],[{"start":{"row":184,"column":1},"end":{"row":184,"column":2},"action":"remove","lines":["/"],"id":8379}],[{"start":{"row":184,"column":0},"end":{"row":184,"column":1},"action":"remove","lines":["/"],"id":8380}],[{"start":{"row":185,"column":1},"end":{"row":185,"column":2},"action":"remove","lines":["/"],"id":8381}],[{"start":{"row":185,"column":0},"end":{"row":185,"column":1},"action":"remove","lines":["/"],"id":8382}],[{"start":{"row":186,"column":1},"end":{"row":186,"column":2},"action":"remove","lines":["/"],"id":8383}],[{"start":{"row":186,"column":0},"end":{"row":186,"column":1},"action":"remove","lines":["/"],"id":8384}],[{"start":{"row":187,"column":1},"end":{"row":187,"column":2},"action":"remove","lines":["/"],"id":8385}],[{"start":{"row":187,"column":0},"end":{"row":187,"column":1},"action":"remove","lines":["/"],"id":8386}],[{"start":{"row":197,"column":1},"end":{"row":197,"column":2},"action":"remove","lines":["/"],"id":8387}],[{"start":{"row":197,"column":1},"end":{"row":197,"column":2},"action":"remove","lines":[" "],"id":8388}],[{"start":{"row":197,"column":0},"end":{"row":197,"column":1},"action":"remove","lines":["/"],"id":8389}],[{"start":{"row":198,"column":1},"end":{"row":198,"column":2},"action":"remove","lines":["/"],"id":8390}],[{"start":{"row":198,"column":0},"end":{"row":198,"column":1},"action":"remove","lines":["/"],"id":8391}],[{"start":{"row":199,"column":1},"end":{"row":199,"column":2},"action":"remove","lines":["/"],"id":8392}],[{"start":{"row":199,"column":0},"end":{"row":199,"column":1},"action":"remove","lines":["/"],"id":8393}],[{"start":{"row":200,"column":1},"end":{"row":200,"column":2},"action":"remove","lines":["/"],"id":8394}],[{"start":{"row":200,"column":0},"end":{"row":200,"column":1},"action":"remove","lines":["/"],"id":8395}],[{"start":{"row":201,"column":1},"end":{"row":201,"column":2},"action":"remove","lines":["/"],"id":8396}],[{"start":{"row":201,"column":0},"end":{"row":201,"column":1},"action":"remove","lines":["/"],"id":8397}],[{"start":{"row":202,"column":1},"end":{"row":202,"column":2},"action":"remove","lines":["/"],"id":8398}],[{"start":{"row":202,"column":0},"end":{"row":202,"column":1},"action":"remove","lines":["/"],"id":8399}],[{"start":{"row":199,"column":33},"end":{"row":199,"column":34},"action":"remove","lines":["x"],"id":8400}],[{"start":{"row":199,"column":32},"end":{"row":199,"column":33},"action":"remove","lines":["e"],"id":8401}],[{"start":{"row":199,"column":31},"end":{"row":199,"column":32},"action":"remove","lines":["d"],"id":8402}],[{"start":{"row":199,"column":30},"end":{"row":199,"column":31},"action":"remove","lines":["n"],"id":8403}],[{"start":{"row":199,"column":29},"end":{"row":199,"column":30},"action":"remove","lines":["i"],"id":8404}],[{"start":{"row":199,"column":29},"end":{"row":199,"column":30},"action":"insert","lines":["a"],"id":8405}],[{"start":{"row":199,"column":30},"end":{"row":199,"column":31},"action":"insert","lines":["r"],"id":8406}],[{"start":{"row":199,"column":31},"end":{"row":199,"column":32},"action":"insert","lines":["d"],"id":8407}],[{"start":{"row":199,"column":32},"end":{"row":199,"column":33},"action":"insert","lines":["u"],"id":8408}],[{"start":{"row":199,"column":33},"end":{"row":199,"column":34},"action":"insert","lines":["i"],"id":8409}],[{"start":{"row":199,"column":34},"end":{"row":199,"column":35},"action":"insert","lines":["n"],"id":8410}],[{"start":{"row":199,"column":35},"end":{"row":199,"column":36},"action":"insert","lines":["o"],"id":8411}],[{"start":{"row":197,"column":0},"end":{"row":197,"column":3},"action":"insert","lines":["// "],"id":8412}],[{"start":{"row":198,"column":4},"end":{"row":198,"column":7},"action":"insert","lines":["// "],"id":8413}],[{"start":{"row":199,"column":8},"end":{"row":199,"column":11},"action":"insert","lines":["// "],"id":8414}],[{"start":{"row":200,"column":8},"end":{"row":200,"column":11},"action":"insert","lines":["// "],"id":8415}],[{"start":{"row":201,"column":8},"end":{"row":201,"column":11},"action":"insert","lines":["// "],"id":8416}],[{"start":{"row":202,"column":4},"end":{"row":202,"column":7},"action":"insert","lines":["// "],"id":8417}],[{"start":{"row":258,"column":0},"end":{"row":258,"column":3},"action":"insert","lines":["// "],"id":8421}],[{"start":{"row":256,"column":4},"end":{"row":256,"column":7},"action":"insert","lines":["// "],"id":8420}],[{"start":{"row":254,"column":4},"end":{"row":254,"column":7},"action":"insert","lines":["// "],"id":8419}],[{"start":{"row":253,"column":0},"end":{"row":253,"column":3},"action":"insert","lines":["// "],"id":8418}]]},"ace":{"folds":[],"scrolltop":3239,"scrollleft":0,"selection":{"start":{"row":202,"column":4},"end":{"row":202,"column":7},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":230,"state":"no_regex","mode":"ace/mode/javascript"}},"timestamp":1439321427694}