/**
 * Created by Maciej on 9/3/2014.
 */

var _ = require("underscore");
module.exports = {
    name: "base",
    extend: function(child) {
        return _.extend({}, this, child);
    },
    run: function(req, res, next) {

    }


}