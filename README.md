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
