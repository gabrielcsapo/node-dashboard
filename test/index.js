var request = require('supertest');
var chance = require('chance')();
var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var random_ua = require('random-ua');

describe('node-dashboard', function() {

    before(function(done) {
        try {
            fs.unlinkSync(path.resolve(__dirname, '..', 'dashboard.json'));
        } catch (ex) {} // eslint-disable-line no-empty
        done();
    });

    it('should spawn node-dashboard', function(done) {
        require('../example/index');
        done();
    });

    var referrer = ['noruc.gm', 'imajupet.hn', 'milo.gt', 'wubi.vn', 'rekwo.nz'];

    for (var i = 0; i < 25; i++) {
        it('should test if routes are bound', function(done) {
            this.timeout(100000);
            request('http://localhost:1337')
                .get('/')
                .set('Host', 'http://localhost:1337')
                .set('x-forwarded-for', chance.ip())
                .set('user-agent', random_ua.generate())
                .set('referrer', _.sample(referrer))
                .end(function(err) {
                    if (err) {
                        throw err;
                    }
                    request('http://localhost:1337')
                        .get('/hello')
                        .set('Host', 'http://localhost:1337')
                        .set('x-forwarded-for', chance.ip())
                        .set('user-agent', random_ua.generate())
                        .set('referrer', _.sample(referrer))
                        .end(function(err) {
                            if (err) {
                                throw err;
                            }
                            request('http://localhost:1337')
                                .get('/world')
                                .set('Host', 'http://localhost:1337')
                                .set('x-forwarded-for', chance.ip())
                                .set('user-agent', random_ua.generate())
                                .set('referrer', _.sample(referrer))
                                .end(function(err) {
                                    if (err) {
                                        throw err;
                                    }
                                    setTimeout(function() {
                                        done();
                                    }, Math.round(Math.random() * (3000 - 500)) + 500);
                                });
                        });
                });
        });
    }

});
