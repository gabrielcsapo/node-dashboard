/** 'countries', 'referrers', 'status', 'urls', 'urlAverageTime' **/
var Chart = require('chart.js');
var moment = require('moment');
var chance = require('chance')();
var _ = require('underscore');

window.createGraphs = function(d) {
    if(d) {
        d = JSON.parse(d);
        createCountryGraph(d);
        createReferrersGraph(d);
        createStatusGraph(d);
        createTrafficGraph(d);
        createUrlGraph(d);
        createUrlAverageTime(d);
        createBrowserGraph(d);
        createOSGraph(d);
        urlResponseSizeGraph(d);
        createMethodGraph(d);
    }
}

window.createOSGraphs = function() {
    (function() {
        var labels = [];
        var data = [];
        var d = JSON.parse(document.getElementById('memory-graph').dataset['storedvalues']);
        d.forEach(function(s) {
            data.push(s[1]);
            labels.push(moment(s[0]).format('HH:mm:ss'));
        });
        createGraph(
            document.querySelector('#memory-graph canvas'),
            labels,
            data,
            'Memory Usage',
            'line'
        );
    }());

    (function() {
        var labels = [];
        var data = [];
        var d = JSON.parse(document.getElementById('cpu-graph').dataset['storedvalues']);
        d.forEach(function(s) {
            data.push(s[1]);
            labels.push(moment(s[0]).format('HH:mm:ss'));
        });
        createGraph(
            document.querySelector('#cpu-graph canvas'),
            labels,
            data,
            'CPU Usage',
            'line'
        );
    }());

    (function() {
        var labels = [];
        var data = [];
        var d = JSON.parse(document.getElementById('heap-graph').dataset['storedvalues']);
        d.forEach(function(s) {
            data.push(s[1]);
            labels.push(moment(s[0]).format('HH:mm:ss'));
        });
        createGraph(
            document.querySelector('#heap-graph canvas'),
            labels,
            data,
            'Heap Usage',
            'line'
        );
    }());
}

var createGraph = function(ctx, labels, data, label, type) {
    var color = chance.color({format: 'rgb'});
    new Chart(ctx, {
        type: type || 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: color,
                borderColor: color.replace(')', ',0.1)')
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}

var createUrlAverageTime = function(d) {
    var labels = [];
    var data = [];
    document.getElementById('label-graph-urlAverageTime-' + d.domain).checked = true;
    Object.keys(d.urlAverageTime).forEach(function(u) {
        labels.push(d.urlAverageTime[u].url);
        data.push(d.urlAverageTime[u].time);
    });
    createGraph(
        document.querySelector('#' + d.domain + '-urlAverageTime canvas'),
        labels,
        data,
        'Url Average Time'
    );
}

var createUrlGraph = function(d) {
    var labels = [];
    var data = [];
    document.getElementById('label-graph-urls-' + d.domain).checked = true;
    Object.keys(d.urls).forEach(function(u) {
        labels.push(d.urls[u].url);
        data.push(d.urls[u].count);
    });
    createGraph(
        document.querySelector('#' + d.domain + '-urls canvas'),
        labels,
        data,
        'Url Hits'
    );
}

var createBrowserGraph = function(d) {
    var labels = [];
    var data = [];
    document.getElementById('label-graph-browsers-' + d.domain).checked = true;
    Object.keys(d.browsers).forEach(function(s) {
        labels.push(s);
        data.push(d.browsers[s]);
    });
    createGraph(
        document.querySelector('#' + d.domain + '-browsers canvas'),
        labels,
        data,
        'Browsers'
    );
}

var createOSGraph = function(d) {
    var labels = [];
    var data = [];
    document.getElementById('label-graph-os-' + d.domain).checked = true;
    Object.keys(d.os).forEach(function(s) {
        labels.push(s);
        data.push(d.os[s]);
    });
    createGraph(
        document.querySelector('#' + d.domain + '-os canvas'),
        labels,
        data,
        'OS'
    );
}

var createStatusGraph = function(d) {
    var labels = [];
    var data = [];
    document.getElementById('label-graph-status-' + d.domain).checked = true;
    Object.keys(d.status).forEach(function(s) {
        labels.push(s);
        data.push(d.status[s]);
    });
    createGraph(
        document.querySelector('#' + d.domain + '-status canvas'),
        labels,
        data,
        'HTTP Statuses'
    );
}

var createReferrersGraph = function(d) {
    var labels = [];
    var data = [];
    document.getElementById('label-graph-referrers-' + d.domain).checked = true;
    Object.keys(d.referrers).forEach(function(r) {
        labels.push(r);
        data.push(d.referrers[r]);
    });
    createGraph(
        document.querySelector('#' + d.domain + '-referrers canvas'),
        labels,
        data,
        'Refferers'
    );
}

var urlResponseSizeGraph = function(d) {
    var labels = [];
    var data = [];
    document.getElementById('label-graph-urlResponseSize-' + d.domain).checked = true;
    Object.keys(d.urlResponseSize).forEach(function(u) {
        labels.push(d.urlResponseSize[u].url);
        data.push(d.urlResponseSize[u].size);
    });
    createGraph(
        document.querySelector('#' + d.domain + '-urlResponseSize canvas'),
        labels,
        data,
        'Url Response Size'
    );
}

var createCountryGraph = function(d) {
    var labels = [];
    var data = [];
    document.getElementById('label-graph-countries-' + d.domain).checked = true;
    Object.keys(d.countries).forEach(function(c) {
        labels.push(c);
        data.push(d.countries[c]);
    });
    createGraph(
        document.querySelector('#' + d.domain + '-countries canvas'),
        labels,
        data,
        'Countries'
    );
}

var createTrafficGraph = function(d) {
    var data = [];
    d.urlTimes.forEach(function(c) {
        data.push({
            label: c.url,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderColor: chance.color({format: 'rgb'}),
            data: _.map(c.time, function(t) {
                return { y: t.time, x: t.date }
            })
        });
    });
    new Chart(document.querySelector('#' + d.domain + '-traffic canvas'), {
        type: 'line',
        data: {
            labels: [],
            datasets: data
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });
}

var createMethodGraph = function(d) {
    var labels = [];
    var data = [];
    var color = chance.color({format: 'rgb'});
    d.urlMethods.forEach(function(c) {
        var url = c.url;
        for(var key in c.methods) {
            labels.push(url + '-' + key);
            data.push(c.methods[key]);
        }
    });
    document.getElementById('label-graph-urlMethods-' + d.domain).checked = true;
    new Chart(document.querySelector('#' + d.domain + '-urlMethods canvas'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Url Methods',
                data: data,
                backgroundColor: color,
                borderColor: color.replace(')', ',0.1)')
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}
