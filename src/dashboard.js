/** 'countries', 'referrers', 'status', 'urls', 'urlAverageTime' **/
var Chart = require('chart.js');
var moment = require('moment');
var chance = require('chance')();

window.createGraphs = function(d) {
    if(d) {
        d = JSON.parse(d);
        createCountryGraph(d);
        createReferrersGraph(d);
        createStatusGraph(d);
        createUrlGraph(d);
        createUrlAverageTime(d);
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
        var color = chance.color({format: 'rgb'});
        new Chart(document.querySelector('#memory-graph canvas'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Memory Usage",
                    data: data,
                    backgroundColor: color,
                    borderColor: color.replace(')', ',0.1)')
                }]
            },
            options: {}
        });
    }());

    (function() {
        var labels = [];
        var data = [];
        var d = JSON.parse(document.getElementById('cpu-graph').dataset['storedvalues']);
        d.forEach(function(s) {
            data.push(s[1]);
            labels.push(moment(s[0]).format('HH:mm:ss'));
        });
        var color = chance.color({format: 'rgb'});
        new Chart(document.querySelector('#cpu-graph canvas'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "CPU Usage",
                    data: data,
                    backgroundColor: color,
                    borderColor: color.replace(')', ',0.1)')
                }]
            },
            options: {}
        });
    }());
}

var createUrlAverageTime = function(d) {
    var labels = [];
    var data = [];
    document.getElementById('label-graph-urlAverageTime-' + d.domain).checked = true;
    Object.keys(d.urlAverageTime).forEach(function(u) {
        labels.push(d.urlAverageTime[u].url);
        data.push(d.urlAverageTime[u].time);
    });
    var color = chance.color({format: 'rgb'});
    new Chart(document.querySelector('#' + d.domain + '-urlAverageTime canvas'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "UrlAverageTime",
                data: data,
                backgroundColor: color,
                borderColor: color.replace(')', ',0.1)')
            }]
        },
        options: {}
    });
}

var createUrlGraph = function(d) {
    var labels = [];
    var data = [];
    document.getElementById('label-graph-urls-' + d.domain).checked = true;
    Object.keys(d.urls).forEach(function(u) {
        labels.push(d.urls[u].url);
        data.push(d.urls[u].count);
    });
    var color = chance.color({format: 'rgb'});
    new Chart(document.querySelector('#' + d.domain + '-urls canvas'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Url Hits",
                data: data,
                backgroundColor: color,
                borderColor: color.replace(')', ',0.1)')
            }]
        },
        options: {}
    });
}

var createStatusGraph = function(d) {
    var labels = [];
    var data = [];
    document.getElementById('label-graph-status-' + d.domain).checked = true;
    Object.keys(d.status).forEach(function(s) {
        labels.push(s);
        data.push(d.status[s]);
    });
    var color = chance.color({format: 'rgb'});
    new Chart(document.querySelector('#' + d.domain + '-status canvas'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "HTTP Statuses",
                data: data,
                backgroundColor: color,
                borderColor: color.replace(')', ',0.1)')
            }]
        },
        options: {}
    });
}

var createReferrersGraph = function(d) {
    var labels = [];
    var data = [];
    document.getElementById('label-graph-referrers-' + d.domain).checked = true;
    Object.keys(d.referrers).forEach(function(r) {
        labels.push(r);
        data.push(d.referrers[r]);
    });
    var color = chance.color({format: 'rgb'});
    new Chart(document.querySelector('#' + d.domain + '-referrers canvas'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Refferers",
                data: data,
                backgroundColor: color,
                borderColor: color.replace(')', ',0.1)')
            }]
        },
        options: {}
    });
}

var createCountryGraph = function(d) {
    var labels = [];
    var data = [];
    document.getElementById('label-graph-countries-' + d.domain).checked = true;
    Object.keys(d.countries).forEach(function(c) {
        labels.push(c);
        data.push(d.countries[c]);
    });
    var color = chance.color({format: 'rgb'});
    new Chart(document.querySelector('#' + d.domain + '-countries canvas'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Countries",
                data: data,
                backgroundColor: color,
                borderColor: color.replace(')', ',0.1)')
            }]
        },
        options: {}
    });
}
