this["JST"] = this["JST"] || {};

this["JST"]["src/templates/entry.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<div class="row" style="max-height:500px;margin-top: 15px;margin-bottom: 15px;">\n    '; if(table) { ;__p += '\n    <div class="column col-md-4 col-sm-4 col-xs-12">\n        <h3 style="text-align: center;"> ' +((__t = ( title )) == null ? '' : __t) +' </h3>\n        <div style="padding:10px;">\n            ' +((__t = ( table )) == null ? '' : __t) +'\n        </div>\n    </div>\n    <div class="column col-md-8 col-sm-8 col-xs-8">\n        <h3> &nbsp;&nbsp;&nbsp;&nbsp; </h3>\n        <div id="' +((__t = ( id )) == null ? '' : __t) +'" style="padding:10px;"></div>\n    </div>\n    '; } else { ;__p += '\n        <div class="column col-md-12 col-sm-12 col-xs-12">\n            <div style="padding:10px">\n                <div class="col-md-4 col-sm-4 col-xs-4">\n                    <h3 style="text-align:center;"> ' +((__t = ( title )) == null ? '' : __t) +' </h3>\n                </div>\n                <div class="col-md-8 col-sm-8 col-xs-8"></div>\n                <div id="' +((__t = ( id )) == null ? '' : __t) +'"></div>\n            </div>\n        </div>\n    '; } ;__p += '\n</div>\n<hr>\n';}return __p};

this["JST"]["src/templates/table.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<div>\n    <table class="table table-responsive table-condensed">\n      <thead>\n          <tr>\n            '; _.each(keys, function(key) { ;__p += '\n                <th>' +((__t = ( key )) == null ? '' : __t) +'</th>\n            '; }); ;__p += '\n          </tr>\n      </thead>\n    </table>\n    <div style="height:400px;overflow:scroll;">\n        <table class="table table-responsive table-condensed">\n            <tbody>\n            '; _.each(data, function(d) { ;__p += '\n                <tr>\n                    '; _.each(d, function(_d) { ;__p += '\n                      <td> ' +((__t = ( _d )) == null ? '' : __t) +'</td>\n                    '; }); ;__p += '\n                </tr>\n            '; }); ;__p += '\n            </tbody>\n        </table>\n    </div>\n</div>\n';}return __p};