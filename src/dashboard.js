require('psychic-ui/dist/psychic-perisian.css');
require('./dashboard.css');

window._ = require('underscore'); // needs to be globaly ascessible
var templates = require('./templates');
var request = require('request');
var c3 = require('c3');

var Table = templates['JST']['src/templates/table.html'];
var Column = templates['JST']['src/templates/column.html'];
var Grid = templates['JST']['src/templates/grid.html'];

var Layout = [];

request(window.location.href + '/request/json', function (error, response, body) {
    JSON.parse(body).forEach(function(host) {
        var Page = {
            header: [],
            body: []
        }
        Object.keys(host).sort().forEach(function(key) {
            switch(key) {
                case 'browsers':
                    var data = Object.keys(host[key] || {}).map(function(k) {
                        return [k, host[key][k]]
                    });
                    Page.body.push(Column({
                        component: Table({
                            title: 'Browsers',
                            keys: ['Browser', 'Hits'],
                            data: data
                        })
                    }));
                break;
                case 'countries':
                    var data = Object.keys(host[key] || {}).map(function(k) {
                        return [k, host[key][k]]
                    });
                    Page.body.push(Column({
                        component: Table({
                            title: 'Countries',
                            keys: ['Country', 'Hits'],
                            data: data
                        })
                    }));
                break;
                case 'domain':
                    Page.header.push('<div class="col-12-12"><h3 style="text-align:center;">' + host[key] + '</h3></div>');
                break;
                case 'countries':
                    var data = Object.keys(host[key] || {}).map(function(k) {
                        return [k, host[key][k]]
                    });
                    Page.body.push(Column({
                        component: Table({
                            title: 'Countries',
                            keys: ['Country', 'Hits'],
                            data: data
                        })
                    }));
                break;
                case 'urls':
                    var data = Object.keys(host[key] || {}).map(function(k) {
                        return [k, host[key][k]]
                    });
                    Page.body.push(Column({
                        component: Table({
                            title: 'Urls',
                            keys: ['Urls', 'Hits'],
                            data: data
                        })
                    }));
                break;
                case 'urlAverageTime':
                    var data = Object.keys(host[key] || {}).map(function(k) {
                        return [k, host[key][k]]
                    });
                    Page.body.push(Column({
                        component: Table({
                            title: 'Url Average Time',
                            keys: ['Urls', 'Average Time'],
                            data: data
                        })
                    }));
                break;
                case 'urlTimes':
                break;
                case 'urlResponseSize':
                    var data = Object.keys(host[key] || {}).map(function(i) {
                        return [host[key][i].url, host[key][i].amount, host[key][i].size]
                    });
                    Page.body.push(Column({
                        component: Table({
                            title: 'Url Response Size',
                            keys: ['Url', 'Amount', 'Size'],
                            data: data
                        })
                    }));
                break;
                case 'urlMethods':
                    var data = Object.keys(host[key] || {}).map(function(i) {
                        return Object.keys(host[key][i].methods || {}).map(function(m) {
                            return [host[key][i].url, m, host[key][i].methods[m]]
                        });
                    });
                    data = [].concat.apply([], data);
                    Page.body.push(Column({
                        component: Table({
                            title: 'Url Methods',
                            keys: ['Url', 'Method', 'Hits'],
                            data: data
                        })
                    }));
                break;
                case 'referrers':
                    var data = Object.keys(host[key] || {}).map(function(k) {
                        return [k, host[key][k]]
                    });
                    Page.body.push(Column({
                        component: Table({
                            title: 'Referrers',
                            keys: ['Referrer', 'Hits'],
                            data: data
                        })
                    }));
                break;
                case 'status':
                    var data = Object.keys(host[key] || {}).map(function(k) {
                        return [k, host[key][k]]
                    });
                    Page.body.push(Column({
                        component: Table({
                            title: 'HTTP Statuses',
                            keys: ['Status', 'Hits'],
                            data: data
                        })
                    }));
                break;
                case 'os':
                    var data = Object.keys(host[key] || {}).map(function(k) {
                        return [k, host[key][k]]
                    });
                    Page.body.push(Column({
                        component: Table({
                            title: 'Operating Systems',
                            keys: ['OS', 'Hits'],
                            data: data
                        })
                    }));
                break;
            }
        });
        Layout.push(Grid({
            html: Page.header.join('') + Page.body.join('')
        }));
    });

    document.getElementById('grid').innerHTML = Layout.join('<br><hr class="ellipsis"/><br><br>');
});
