var responseTime = require('response-time');
var moment = require('moment');
var geoip = require('geoip-lite');
var parser = require('ua-parser-js');

var flat = require('node-flat-db');
var db = flat('dashboard.json', {
    storage: require('node-flat-db/file-sync')
});

module.exports = responseTime(function(req, res, time) {
    var method = req.method;
    var message = res.statusMessage;
    var status = res.statusCode;
    var ip = req.query.ip ||
        req.headers['x-forwarded-for'] ||
        req.headers["X-Forwarded-For"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var ua = parser(req.headers['user-agent']);
    var geo = geoip.lookup(ip);
    var referrer = req.get('Referrer');
    var hostname = req.headers.host.split(":")[0];
    hostname = hostname.substring(0, hostname.indexOf('.'));
    if (db(hostname).find({
            url: req.originalUrl
        })) {
        db(hostname).find({
            url: req.originalUrl
        }).traffic.push({
            method: method,
            message: message,
            status: status,
            date: moment().format('x'),
            time: time,
            geo: geo,
            referrer: referrer,
            ua: ua,
            size: res._headers['content-length']
        })
    } else {
        db(hostname).push({
            url: req.originalUrl,
            traffic: [{
                method: method,
                message: message,
                status: status,
                date: moment().format('x'),
                time: time,
                geo: geo,
                referrer: referrer,
                ua: ua,
                size: res._headers['content-length']
            }]
        });
    }
});
