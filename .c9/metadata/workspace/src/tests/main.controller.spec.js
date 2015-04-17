{"filter":false,"title":"main.controller.spec.js","tooltip":"/src/tests/main.controller.spec.js","undoManager":{"mark":33,"position":33,"stack":[[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":0,"column":0},"end":{"row":0,"column":13}},"text":"'use strict';"},{"action":"insertText","range":{"start":{"row":0,"column":13},"end":{"row":1,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":1,"column":0},"end":{"row":28,"column":0}},"lines":["","describe('Controller: MainCtrl', function () {","","  // load the controller's module","  beforeEach(module('jsSparkUiApp'));","  beforeEach(module('socketMock'));","","  var MainCtrl,","      scope,","      $httpBackend;","","  // Initialize the controller and a mock scope","  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {","    $httpBackend = _$httpBackend_;","    $httpBackend.expectGET('/api/things')","      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);","","    scope = $rootScope.$new();","    MainCtrl = $controller('MainCtrl', {","      $scope: scope","    });","  }));","","  it('should attach a list of things to the scope', function () {","    $httpBackend.flush();","    expect(scope.awesomeThings.length).toBe(4);","  });"]},{"action":"insertText","range":{"start":{"row":28,"column":0},"end":{"row":28,"column":3}},"text":"});"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":32},"end":{"row":5,"column":33}},"text":"p"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":31},"end":{"row":5,"column":32}},"text":"p"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":30},"end":{"row":5,"column":31}},"text":"A"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":29},"end":{"row":5,"column":30}},"text":"i"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":28},"end":{"row":5,"column":29}},"text":"U"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":27},"end":{"row":5,"column":28}},"text":"k"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":26},"end":{"row":5,"column":27}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":25},"end":{"row":5,"column":26}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":24},"end":{"row":5,"column":25}},"text":"p"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":23},"end":{"row":5,"column":24}},"text":"S"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":5,"column":23},"end":{"row":5,"column":24}},"text":"p"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":5,"column":24},"end":{"row":5,"column":25}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":5,"column":25},"end":{"row":5,"column":26}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":5,"column":26},"end":{"row":5,"column":27}},"text":"j"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":21},"end":{"row":5,"column":27}},"text":"jsproj"},{"action":"insertText","range":{"start":{"row":5,"column":21},"end":{"row":5,"column":36}},"text":"jsprojectkUiApp"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":15,"column":38},"end":{"row":15,"column":39}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":15,"column":37},"end":{"row":15,"column":38}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":15,"column":36},"end":{"row":15,"column":37}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":15,"column":35},"end":{"row":15,"column":36}},"text":"i"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":15,"column":34},"end":{"row":15,"column":35}},"text":"h"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":15,"column":33},"end":{"row":15,"column":34}},"text":"t"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":33},"end":{"row":15,"column":34}},"text":"h"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":34},"end":{"row":15,"column":35}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":35},"end":{"row":15,"column":36}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":36},"end":{"row":15,"column":37}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1,"column":0},"end":{"row":2,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2,"column":0},"end":{"row":3,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":3,"column":0},"end":{"row":3,"column":1}},"text":"/"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":3,"column":1},"end":{"row":3,"column":2}},"text":"*"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":30,"column":3},"end":{"row":31,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":31,"column":0},"end":{"row":32,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":32,"column":0},"end":{"row":32,"column":1}},"text":"*"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":32,"column":1},"end":{"row":32,"column":2}},"text":"/"}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":4,"column":11},"end":{"row":4,"column":20},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1416393359000,"hash":"56ca948f3248481a4896991af80d160d6b669867"}