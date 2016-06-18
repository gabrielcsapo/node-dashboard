/** 'countries', 'referrers', 'status', 'urls', 'urlAverageTime' **/
var createGraphs = function(d) { // eslint-disable-line no-unused-vars
    d = JSON.parse(d);
    createCountryGraph(d);
    createReferrersGraph(d);
    createStatusGraph(d);
    createUrlGraph(d);
    createUrlAverageTime(d);
}

var createUrlAverageTime = function(d) {
    var labels = [];
    var data = [];
    document.getElementById('label-graph-urlAverageTime-' + d.domain).checked = true;
    Object.keys(d.urlAverageTime).forEach(function(u) {
        labels.push(d.urlAverageTime[u].url);
        data.push(d.urlAverageTime[u].time);
    });
    new Chart(document.querySelector('#' + d.domain + '-urlAverageTime canvas'), { // eslint-disable-line no-undef
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "UrlAverageTime",
                data: data
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
    new Chart(document.querySelector('#' + d.domain + '-urls canvas'), { // eslint-disable-line no-undef
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Url Hits",
                data: data
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
    new Chart(document.querySelector('#' + d.domain + '-status canvas'), { // eslint-disable-line no-undef
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "HTTP Statuses",
                data: data
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
    new Chart(document.querySelector('#' + d.domain + '-referrers canvas'), { // eslint-disable-line no-undef
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Refferers",
                data: data
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
    new Chart(document.querySelector('#' + d.domain + '-countries canvas'), { // eslint-disable-line no-undef
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Countries",
                data: data
            }]
        },
        options: {}
    });
}
