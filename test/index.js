var request = require('supertest');
var chance = require('chance')();
var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');
var _ = require('underscore');

describe('node-dashboard', function() {

    before(function(done) {
        try {
            fs.unlinkSync(path.resolve(__dirname, '..', 'dashboard.json'));
        } catch(ex) {};
        done();
    });

    it('should spawn node-dashboard', function(done) {
        var app = require('express')();
        var analytics = require('../index');

        app.use(analytics);

        app.listen('1337', function() {
            done();
        });
    });

    var sub = ['vuence', 'sav', 'lefmacto', 'luddas', 'wean', 'foupa'];
    var referrer = ['noruc.gm', 'imajupet.hn','milo.gt','wubi.vn','rekwo.nz'];

    for(var i = 0; i < 10; i++) {
        it('should test if routes are bound', function(done) {
            request('http://localhost:1337')
                .get('/distribute')
                .set('Host', _.sample(sub) + '.example.com')
                .set('x-forwarded-for', chance.ip())
                .set('referrer', _.sample(referrer))
                .expect(200, function(err) {
                    done();
                });
        });
    }

});
