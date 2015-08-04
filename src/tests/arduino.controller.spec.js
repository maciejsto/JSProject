
/*sample test*/


var arduino = require('../backend/controllers/arduino');


describe("Scope", function() {
    it("can be constructed and used as an object", function() {
    var scope = new Object();
    scope.aProperty = 1;
    expect(scope.aProperty).toBe(1);
    });
});

describe("Scope", function() {
    it("can be constructed and used as an object", function() {
    var scope = new Object();
    
    
    scope.aProperty = 1;
    scope.getProperty = function(){
        return scope.aProperty;        
    }
    expect(scope.aProperty).toBe(1);
    expect(scope.getProperty()).toBe(1);
    expect(arduino.name).toBe('ArduinoController');
        
    });
});
/*
describe("Controller: ArduinoController", function() {
    
    
    // load the controller's module
    beforeEach(module('jsprojectApp'));
    //beforeEach(module('socketMock'));
    var ArduinoController,
        scope,
        $httpBackend;
    
    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/home')
        .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

      scope = $rootScope.$new();
      ArduinoController = $controller('ArduinoController', {
        $scope: scope
      });
    }));

  it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
    //expect(scope.awesomeThings.length).toBe(4);
  });
  
  
    it("can be constructed and used as an object", function() {
    
        
    expect(ArduinoController.name).toBe("arduinoController");
    });
});



describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('jsprojectkUiApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/home')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.awesomeThings.length).toBe(4);
  });
});

*/