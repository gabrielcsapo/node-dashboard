var request = require('supertest');
var chance = require('chance')();
var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');

describe('node-dashboard', function() {

    before(function(done) {
        try {
            fs.unlinkSync(path.resolve(__dirname, '..', 'dashboard.json'));
        } catch(ex) {};
        done();
    });

    it('should spawn node-dashboard', function(done) {
        var app = require('express')();
        var dashboard = require('../index');

        app.use(dashboard);

        app.listen('1337', function() {
            console.log('node-dashboard listening on http://localhost:1337');
            done();
        });

    });

    for(var i = 0; i < 10; i++) {
        it('should test if routes are bound', function(done) {
            request('http://localhost:1337')
                .get('/distribute')
                .set('Host', chance.word() + '.example.com')
                .set('x-forwarded-for', chance.ip())
                .set('referrer', chance.domain())
                .expect(200, function(err) {
                    done();
                });
        });
    }

});
