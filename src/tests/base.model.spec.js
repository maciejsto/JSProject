/**
 * Created by Maciej on 9/3/2014.
 */


var Model = require('../backend/service/Base'),
    dbMockup = {};

describe("Models", function(){

    //First test
    it("should create new model",function(next){
        var model = new Model(dbMockup);
        expect(model.db).toBeDefined();
        expect(model.extend).toBeDefined();
        next();
    });

    //Second test
    it("should be extendable", function(next){
        var model = new Model(dbMockup);
        var OtherTypeOfModel = model.extend({
            myCustomModelMethod: function () {}
        });
        var model2 = new OtherTypeOfModel(dbMockup);
        expect(model2.db).toBeDefined();
        expect(model2.myCustomModelMethod()).toBeDefined();
        next();
    });



});