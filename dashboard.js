var flat = require('node-flat-db');
var db = flat('dashboard.json', {
    storage: require('node-flat-db/file-sync')
});
var path = require('path');
var pug = require('pug');
var _ = require('underscore');

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
ex: returns [ { url: '/distribute', count: 11 } ]
**/
var parseUrlList = function(d) {
    return _.map(d, function(route) {
        return {
            url: route.url,
            count: route.traffic.length
        }
    });
}

/**
ex: return [ { url: '/distribute', time: 0.21992199999999998 } ]
**/
var parseUrlAverageTime = function(d) {
    return _.map(d, function(route) {
        return {
            url: route.url,
            time: _.pluck(route.traffic, 'time').reduce(function(a, b) {
                return a + b
            })
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
        "url": "/distribute",
        "time": [
            {
                "time": 0.299826,
                "date": "1466144318850"
            }
        ]
    }
]
**/
var parseUrlTimeList = function(d) {
    return _.map(d, function(route) {
        return {
            url: route.url,
            time: _.map(route.traffic, function(t) {
                return _.pick(t, 'time', 'date');
            })
        }
    });
}

var parse = function() {
    var data = [];
    // This is parsing per hostname
    for (var key in db.object) {
        var d = db.object[key];
        data.push({
            domain: key,
            data: d,
            countries: parseCountryList(d),
            urls: parseUrlList(d),
            urlAverageTime: parseUrlAverageTime(d),
            urlTimes: parseUrlTimeList(d),
            referrers: parseReferrerList(d),
            status: parseStatusList(d)
        });
    }
    return data;
}

module.exports = function(req, res) {
    var html = pug.renderFile(path.resolve(__dirname, 'src', 'dashboard.pug'), {
        data: parse()
    });
    res.send(html);
};
