var app = require('express')();
var analytics = require('../index');
var dashboard = require('../dashboard');

app.use(analytics);

app.get('/', function(req, res) {
    res.send('hello');
});

app.use('/admin', dashboard);

app.listen('1337', function() {
    console.log('node-dashboard listening on http://localhost:1337');
});
