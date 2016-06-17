# node-dashboard

> an express plugin to show route traffic

[![Npm Version](https://img.shields.io/npm/v/node-dashboard.svg)](https://www.npmjs.com/package/node-dashboard)
[![Dependency Status](https://david-dm.org/gabrielcsapo/node-dashboard.svg)](https://david-dm.org/gabrielcsapo/node-dashboard)
[![devDependency Status](https://david-dm.org/gabrielcsapo/node-dashboard/dev-status.svg)](https://david-dm.org/gabrielcsapo/node-dashboard#info=devDependencies)
[![Build Status](https://travis-ci.org/gabrielcsapo/node-dashboard.svg?branch=master)](https://travis-ci.org/gabrielcsapo/node-dashboard)
[![npm](https://img.shields.io/npm/dt/node-dashboard.svg)]()
[![npm](https://img.shields.io/npm/dm/node-dashboard.svg)]()

## Installation

`npm install node-dashboard --save`

## Usage

```javascript
var app = require('express')();
var dashboard = require('node-dashboard');

app.use(dashboard);

app.listen('1337', function() {
    console.log('node-example-app listening on http://localhost:1337');
    done();
});
```

## Data

> structure

```json
"vuk": [ // name of subdomain
  {
    "url": "/distribute", // name of url path
    "traffic": [
      {
        "method": "GET", // HTTP Method
        "message": "Not Found", // HTTP message
        "status": 404, // HTTP Status
        "date": "1466129236274", // Unix-Timestamp
        "time": 0.6272679999999999, // Time in milliseconds
        "geo": { // Geo Object
          "range": [
            117440512,
            134219263
          ],
          "country": "US",
          "region": "",
          "city": "",
          "ll": [
            38,
            -97
          ],
          "metro": 0
        },
        "referrer": "sibwe.gw" // Referrer information
      }
    ]
  }
]
```
