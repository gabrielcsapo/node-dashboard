var app = require('express')();
var analytics = require('../index');
var dashboard = require('../dashboard');

app.use(analytics);

app.get('/', function(req, res) {
    res.send('welcome');
});

app.get('/hello', function(req, res) {
    setTimeout(function() {
        res.send('hello');
    }, 250);
});

app.get('/world', function(req, res) {
    setTimeout(function() {
        res.send('world');
    }, 500);
});

app.use('/admin', dashboard);

app.listen('1337', function() {
    console.log('node-dashboard-example listening on http://localhost:1337'); // eslint-disable-line no-console
});

module.exports = app;
