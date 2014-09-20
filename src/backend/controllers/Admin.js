/**
 * Created by Maciej on 9/3/2014.
 */


var BaseController = require('./Base'),
    View = require('../../front/views/Base');

module.exports = BaseController.extend({

    name: "Admin",
    username: "admin",
    password: "admin",


    run: function(req, res, next) {
        //this.authorize(req)   TODO cant call method with this keyword !!
        this.authorize(req);
        var v = new View(res, 'admin');
        var self = this;
        v.render({
            title: 'Administration',
            content: 'Welcome to the control panel'
        });
    },

    authorize: function(req) {
        return (
            req.session &&
            req.session.fastdelivery &&
            req.session.fastdelivery === true
            ) || (
            req.body &&
            req.body.username === this.username &&
            req.body.password === this.password
            );
    }


        /*
    form: function(req, res, callback) {
        var returnTheForm = function() {
            if(req.query && req.query.action === "edit" && req.query.id) {
                model.getlist(function(err, records) {
                    if(records.length > 0) {
                        var record = records[0];
                        res.render('admin-record', {
                            ID: record.ID,
                            text: record.text,
                            title: record.title,
                            type: '<option value="' + record.type + '">' + record.type + '</option>',
                            picture: record.picture,
                            pictureTag: record.picture != '' ? '<img class="list-picture" src="' + record.picture + '" />' : ''
                        }, function(err, html) {
                            callback(html);
                        });
                    } else {
                        res.render('admin-record', {}, function(err, html) {
                            callback(html);
                        });
                    }
                }, {ID: req.query.id});
            } else {
                res.render('admin-record', {}, function(err, html) {
                    callback(html);
                });
            }
        }
        if(req.body && req.body.formsubmitted && req.body.formsubmitted === 'yes') {
            var data = {
                title: req.body.title,
                text: req.body.text,
                type: req.body.type,
                picture: this.handleFileUpload(req),
                ID: req.body.ID
            }
            model[req.body.ID != '' ? 'update' : 'insert'](data, function(err, objects) {
                returnTheForm();
            });
        } else {
            returnTheForm();
        }
    }
    */
});