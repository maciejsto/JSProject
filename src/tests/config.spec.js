/**
 * Created by Maciej on 9/3/2014.
 */


describe("Configuration setup", function(){

    //test local
    it("should load local configuration", function(next){
        var config = require('../backend/config/index')();
        expect(config.mode).toBe('local');
        next();
    });

    //test staging
    it("should load staging configuration", function(next){
        var config = require('../backend/config/index')('staging');
        expect(config.mode).toBe('staging');
        next();
    });

    //test production
    it("should load production configuration", function(next){
        var config = require('../backend/config/index')('production');
        expect(config.mode).toBe('production');
        next();
    });
});