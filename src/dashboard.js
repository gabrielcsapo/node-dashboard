require('bootstrap/dist/css/bootstrap.min.css');
require('./dashboard.css');
require('c3/c3.min.css');

window._ = require('underscore'); // needs to be globaly ascessible
var templates = require('./templates');
var request = require('request');
var c3 = require('c3');
var moment = require('moment');

var Table = templates['JST']['src/templates/table.html'];
var Entry = templates['JST']['src/templates/entry.html'];
var Tooltip = templates['JST']['src/templates/tooltip.html'];

var Layout = [];
var Graphs = [];
var Charts = {};

request(window.location.href + '/request/json', function(error, response, body) {
    JSON.parse(body).forEach(function(host) {
        var Page = {
            header: [],
            body: []
        }
        Object.keys(host).sort().forEach(function(key) {
            switch (key) {
                case 'domain':
                    Page.header.push('<div class="col-12-12"><h3 style="text-align:center;">' + host[key] + '</h3></div>');
                    break;
                case 'browsers':
                    var data = Object.keys(host[key] || {}).map(function(k) {
                        return [k, host[key][k]]
                    });
                    Page.body.push(Entry({
                        id: 'browsers-' + host['domain'],
                        title: 'Browsers',
                        table: Table({
                            keys: ['Browser', 'Hits'],
                            data: data
                        })
                    }));
                    Graphs.push(function() {
                        document.getElementById('select-browsers-' + host['domain']).addEventListener('change', function(ev) {
                            Charts['browsers-' + host['domain']].transform(ev.target.value);
                        });
                        Charts['browsers-' + host['domain']] = c3.generate({
                            size: {
                                height: 400
                            },
                            legend: {
                                hide: true
                            },
                            tooltip: {
                                grouped: false
                            },
                            bindto: '#browsers-' + host['domain'],
                            data: {
                                columns: data,
                                type: 'bar'
                            }
                        });
                    });
                    break;
                case 'countries':
                    var data = Object.keys(host[key] || {}).map(function(k) {
                        return [k, host[key][k]]
                    });
                    Page.body.push(Entry({
                        id: 'countries-' + host['domain'],
                        title: 'Countries',
                        table: Table({
                            keys: ['Country', 'Hits'],
                            data: data
                        })
                    }));
                    Graphs.push(function() {
                        document.getElementById('select-countries-' + host['domain']).addEventListener('change', function(ev) {
                            Charts['countries-' + host['domain']].transform(ev.target.value);
                        });
                        Charts['countries-' + host['domain']] = c3.generate({
                            size: {
                                height: 400
                            },
                            legend: {
                                hide: true
                            },
                            tooltip: {
                                grouped: false
                            },
                            bindto: '#countries-' + host['domain'],
                            data: {
                                columns: data,
                                type: 'bar'
                            }
                        });
                    });
                    break;
                case 'urls':
                    var data = Object.keys(host[key] || {}).map(function(k) {
                        return [k, host[key][k]]
                    });
                    Page.body.push(Entry({
                        id: 'urls-' + host['domain'],
                        title: 'Urls',
                        table: Table({
                            keys: ['Urls', 'Hits'],
                            data: data
                        })
                    }));
                    Graphs.push(function() {
                        document.getElementById('select-urls-' + host['domain']).addEventListener('change', function(ev) {
                            Charts['urls-' + host['domain']].transform(ev.target.value);
                        });
                        Charts['urls-' + host['domain']] = c3.generate({
                            size: {
                                height: 400
                            },
                            legend: {
                                hide: true
                            },
                            tooltip: {
                                grouped: false
                            },
                            bindto: '#urls-' + host['domain'],
                            data: {
                                columns: data,
                                type: 'bar'
                            }
                        });
                    });
                    break;
                case 'urlAverageTime':
                    var data = Object.keys(host[key] || {}).map(function(k) {
                        return [k, host[key][k]]
                    });
                    Page.body.push(Entry({
                        id: 'url-average-time-' + host['domain'],
                        title: 'Url Average Time',
                        table: Table({
                            keys: ['Urls', 'Average Time'],
                            data: data
                        })
                    }));
                    Graphs.push(function() {
                        document.getElementById('select-url-average-time-' + host['domain']).addEventListener('change', function(ev) {
                            Charts['url-average-time-' + host['domain']].transform(ev.target.value);
                        });
                        Charts['url-average-time-' + host['domain']] = c3.generate({
                            size: {
                                height: 400
                            },
                            legend: {
                                hide: true
                            },
                            tooltip: {
                                grouped: false
                            },
                            bindto: '#url-average-time-' + host['domain'],
                            data: {
                                columns: data,
                                type: 'bar'
                            }
                        });
                    });
                    break;
                case 'urlTimes':
                    var tableData = [];
                    host[key].forEach(function(r) {
                        tableData.push([r.url, r.time, moment(parseInt(r.date)).format()]);
                    });
                    tableData = tableData.sort(function(a, b) {
                        if (a[2] === b[2]) {
                            return 0;
                        } else {
                            return (a[2] > b[2]) ? -1 : 1;
                        }
                    });
                    var hashStringToColor = function(str) {
                        var hash = 0;
                        for (var i = 0; i < str.length; i++) {
                            hash = str.charCodeAt(i) + ((hash << 5) - hash);
                        }
                        var color = '#';
                        for (var i = 0; i < 3; i++) {
                            var value = (hash >> (i * 8)) & 0xFF;
                            color += ('00' + value.toString(16)).substr(-2);
                        }
                        return color;
                    }
                    Page.body.push(Entry({
                        id: 'url-times-' + host['domain'],
                        title: 'Url Times',
                        table: Table({
                            keys: ['Url', 'Time', 'Date'],
                            data: tableData
                        })
                    }));
                    Graphs.push(function() {
                        document.getElementById('select-url-times-' + host['domain']).addEventListener('change', function(ev) {
                            Charts['url-times-' + host['domain']].transform(ev.target.value);
                        });
                        Charts['url-times-' + host['domain']] = c3.generate({
                            size: {
                                height: 400
                            },
                            legend: {
                                hide: true
                            },
                            tooltip: {
                                grouped: false,
                                contents: function(d) {
                                    return Tooltip({
                                        title: d[0].x,
                                        data: [{
                                            name: 'url',
                                            value: host['urlTimes'][d[0].index].url,
                                            color: hashStringToColor(host['urlTimes'][d[0].index].url)
                                        }, {
                                            name: 'time',
                                            value: d[0].value,
                                            color: hashStringToColor(host['urlTimes'][d[0].index].url)
                                        }]
                                    })
                                }
                            },
                            bindto: '#url-times-' + host['domain'],
                            data: {
                                json: host['urlTimes'],
                                keys: {
                                    x: 'date',
                                    value: ['time']
                                },
                                color: function (color, d) {
                                    if(typeof d === 'object' && d.index) {
                                        return hashStringToColor(host['urlTimes'][d.index].url)
                                    } else {
                                        return color;
                                    }
                                }
                            },
                            zoom: {
                                enabled: true
                            },
                            subchart: {
                                show: true
                            },
                            axis: {
                                x: {
                                    type: 'timeseries',
                                    tick: {
                                        format: '%d-%m-%Y %H:%M:%S'
                                    }
                                }
                            }
                        });
                    });
                    break;
                case 'urlResponseSize':
                    var data = Object.keys(host[key] || {}).map(function(i) {
                        return [host[key][i].url, host[key][i].amount, host[key][i].size]
                    });
                    Page.body.push(Entry({
                        id: 'url-response-size-' + host['domain'],
                        title: 'Url Response Size',
                        table: Table({
                            keys: ['Url', 'Hits', 'Size'],
                            data: data
                        })
                    }));
                    Graphs.push(function() {
                        document.getElementById('select-url-response-size-' + host['domain']).addEventListener('change', function(ev) {
                            Charts['url-response-size-' + host['domain']].transform(ev.target.value);
                        });
                        Charts['url-response-size-' + host['domain']] = c3.generate({
                            size: {
                                height: 400
                            },
                            legend: {
                                hide: true
                            },
                            tooltip: {
                                grouped: false
                            },
                            bindto: '#url-response-size-' + host['domain'],
                            data: {
                                columns: data.map(function(d) {
                                    // remove hits from array
                                    d.splice(1, 1);
                                    return d;
                                }),
                                type: 'bar'
                            }
                        });
                    });
                    break;
                case 'urlMethods':
                    var data = Object.keys(host[key] || {}).map(function(i) {
                        return Object.keys(host[key][i].methods || {}).map(function(m) {
                            return [host[key][i].url, m, host[key][i].methods[m]]
                        });
                    });
                    data = [].concat.apply([], data);
                    Page.body.push(Entry({
                        id: 'url-methods-' + host['domain'],
                        title: 'Url Methods',
                        table: Table({
                            keys: ['Url', 'Method', 'Hits'],
                            data: data
                        })
                    }));
                    Graphs.push(function() {
                        document.getElementById('select-url-methods-' + host['domain']).addEventListener('change', function(ev) {
                            Charts['url-methods-' + host['domain']].transform(ev.target.value);
                        });
                        Charts['url-methods-' + host['domain']] = c3.generate({
                            size: {
                                height: 400
                            },
                            legend: {
                                hide: true
                            },
                            tooltip: {
                                grouped: false
                            },
                            bindto: '#url-methods-' + host['domain'],
                            data: {
                                columns: data.map(function(f) {
                                    return [f[0] + '-' + f[1], f[2]];
                                }),
                                type: 'bar'
                            }
                        });
                    });
                    break;
                case 'referrers':
                    var data = Object.keys(host[key] || {}).map(function(k) {
                        return [k, host[key][k]]
                    });
                    Page.body.push(Entry({
                        id: 'referrers-' + host['domain'],
                        title: 'Referrers',
                        table: Table({
                            keys: ['Referrer', 'Hits'],
                            data: data
                        })
                    }));
                    Graphs.push(function() {
                        document.getElementById('select-referrers-' + host['domain']).addEventListener('change', function(ev) {
                            Charts['referrers-' + host['domain']].transform(ev.target.value);
                        });
                        Charts['referrers-' + host['domain']] = c3.generate({
                            size: {
                                height: 400
                            },
                            legend: {
                                hide: true
                            },
                            tooltip: {
                                grouped: false
                            },
                            bindto: '#referrers-' + host['domain'],
                            data: {
                                columns: data,
                                type: 'bar'
                            }
                        });
                    });
                    break;
                case 'status':
                    var data = Object.keys(host[key] || {}).map(function(k) {
                        return [k, host[key][k]]
                    });
                    Page.body.push(Entry({
                        id: 'http-statuses-' + host['domain'],
                        title: 'HTTP Statuses',
                        table: Table({
                            keys: ['Status', 'Hits'],
                            data: data
                        })
                    }));
                    Graphs.push(function() {
                        document.getElementById('select-http-statuses-' + host['domain']).addEventListener('change', function(ev) {
                            Charts['http-statuses-' + host['domain']].transform(ev.target.value);
                        });
                        Charts['http-statuses-' + host['domain']] = c3.generate({
                            size: {
                                height: 400
                            },
                            legend: {
                                hide: true
                            },
                            tooltip: {
                                grouped: false
                            },
                            bindto: '#http-statuses-' + host['domain'],
                            data: {
                                columns: data,
                                type: 'bar'
                            }
                        });
                    });
                    break;
                case 'os':
                    var data = Object.keys(host[key] || {}).map(function(k) {
                        return [k, host[key][k]]
                    });
                    Page.body.push(Entry({
                        id: 'os-' + host['domain'],
                        title: 'Operating Systems',
                        table: Table({
                            keys: ['OS', 'Hits'],
                            data: data
                        })
                    }));
                    Graphs.push(function() {
                        document.getElementById('select-os-' + host['domain']).addEventListener('change', function(ev) {
                            Charts['os-' + host['domain']].transform(ev.target.value);
                        });
                        Charts['os-' + host['domain']] = c3.generate({
                            size: {
                                height: 400
                            },
                            legend: {
                                hide: true
                            },
                            tooltip: {
                                grouped: false
                            },
                            bindto: '#os-' + host['domain'],
                            data: {
                                columns: data,
                                type: 'bar'
                            }
                        });
                    });
                    break;
            }
        });
        Layout.push(Page.header.join('') + Page.body.join(''));
    });

    document.querySelector('.container').innerHTML = Layout.join('<br><hr class="ellipsis"/><br><br>');

    // Stamp out the graphs
    Graphs.forEach(function(graph) {
        graph();
    });
});
