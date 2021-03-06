var flat = require('node-flat-db');
var db = flat('dashboard.json', {
    storage: require('node-flat-db/file-sync')
});
var express = require('express');
var router = express.Router();
var path = require('path');
var pug = require('pug');
var _ = require('underscore');
var os = require('os');
var moment = require('moment');
var filesize = require('filesize');

var system = {
    cpu: [],
    mem: [],
    heap: []
};

var parseSystemStats = function() {
    system.cpu.push([moment().format('X'), os.loadavg()[0]]);
    system.mem.push([moment().format('X'), (process.memoryUsage().rss / 1024 / 1024)]);
    system.heap.push([moment().format('X'), process.memoryUsage().heapUsed / 1024 / 1024]);
    if(system.mem.length > 30) {
        system.mem.pop();
        system.cpu.pop();
        system.heap.pop();
    }
};

var parseOSList = function(d) {
    return _.flatten(_.map(d, function(route) {
        return _.pluck(_.pluck(_.compact(_.pluck(route.traffic, 'ua')), 'os'), 'name')
    })).reduce(function(acc, curr) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
}

/**
ex: returns { Chrome: 11, Firefox: 4, IE: 5, Safari: 1 }
**/
var parseBrowserList = function(d) {
    return _.flatten(_.map(d, function(route) {
        return _.pluck(_.pluck(_.compact(_.pluck(route.traffic, 'ua')), 'browser'), 'name')
    })).reduce(function(acc, curr) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
}

/**
ex: returns { KR: 1, FR: 1, CA: 1, NO: 1, RU: 1, US: 2 }
**/
var parseCountryList = function(d) {
    return _.flatten(_.map(d, function(route) {
        return _.pluck(_.compact(_.pluck(route.traffic, 'geo')), 'country')
    })).reduce(function(acc, curr) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
}

/**
ex: returns { '/distribute': 11 }
**/
var parseUrlList = function(d) {
    var temp = {};
    _.map(d, function(route) {
        temp[route.url] = route.traffic.length;
    });
    return temp;
}

/**
ex: returns [{ url: '/', methods: { GET: 24 } }]
**/
var parseUrlMethodList = function(d) {
    return _.map(d, function(route) {
        return {
            url: route.url,
            methods: _.map(route.traffic, function(traffic) {
                return traffic.method
            }).reduce(function(acc, curr) {
                if (typeof acc[curr] == 'undefined') {
                    acc[curr] = 1;
                } else {
                    acc[curr] += 1;
                }
                return acc;
            }, {})
        }
    });
}

/**
ex: return { '/distribute': 0.21992199999999998 }
**/
var parseUrlAverageTime = function(d) {
    var temp = {};
    d.forEach(function(route) {
        var times = _.pluck(route.traffic, 'time');
        temp[route.url] = (times.reduce(function(a, b) {
            return a + b
        }) / times.length);
    });
    return temp;
}

/**
ex: return [ { url: '/admin/', size: '579.09', amount: 18 } ]
**/
var parseUrlResponseSize = function(d) {
    return _.map(d, function(route) {
        return {
            url: route.url,
            size: _.pluck(route.traffic, 'size').reduce(function(a, b) {
                return parseInt(a || 0) + parseInt(b || 0)
            }) / route.traffic.length,
            amount: route.traffic.length
        }
    });
}

/**
ex: returns { 'milo.gt': 4, 'noruc.gm': 2, 'rekwo.nz': 2, 'imajupet.hn': 1 }
**/
var parseReferrerList = function(d) {
    return _.compact(_.flatten(_.map(d, function(route) {
        return _.pluck(route.traffic, 'referrer')
    }))).reduce(function(acc, curr) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
}

/**
ex: returns { '404': 1 }
**/
var parseStatusList = function(d) {
    return _.compact(_.flatten(_.map(d, function(route) {
        return _.pluck(route.traffic, 'status')
    }))).reduce(function(acc, curr) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
}

/**
ex: returns [
    {
        time: 4.324841999999999,
        date: '1472165962195',
        contentType: 'application/json; charset=utf-8',
        url: '/'
    }
]
**/
var parseUrlTimeList = function(d) {
    var list = _.map(d, function(route) {
        return _.map(route.traffic, function(t) {
            var temp = _.pick(t, 'time', 'date', 'contentType', 'status', 'size');
            temp.url = route.url;
            temp.date = parseInt(temp.date);
            temp.size = filesize(temp.size || 0);
            return temp;
        });
    });
    list = [].concat.apply([], list);
    list = _.sortBy(list, 'date');
    return list;
}

var parse = function() {
    var data = [];
    db.read();
    // This is parsing per hostname
    for (var key in db.object) {
        var d = db.object[key];
        data.push({
            domain: key,
            countries: parseCountryList(d),
            urls: parseUrlList(d),
            urlTimes: parseUrlTimeList(d),
            urlAverageTime: parseUrlAverageTime(d),
            urlResponseSize: parseUrlResponseSize(d),
            urlMethods: parseUrlMethodList(d),
            referrers: parseReferrerList(d),
            status: parseStatusList(d),
            browsers: parseBrowserList(d),
            os: parseOSList(d)
        });
    }
    return data;
}

parseSystemStats();
setInterval(function() {
    parseSystemStats();
}, 10000);

router.get('/', function(req, res) {
    res.send(pug.renderFile(path.resolve(__dirname, 'src', 'dashboard.pug')));
});

router.get('/system/json', function(req, res) {
    res.send({
        cpu: system.cpu,
        mem: system.mem,
        heap: system.heap,
        info: {
            arch: os.arch(),
            hostname: os.hostname(),
            platform: os.platform(),
            version: process.version,
            memory: filesize(os.totalmem() || 0)
        }
    });
});

router.get('/traffic/json', function(req, res) {
    res.send(parse());
});

module.exports = router;
