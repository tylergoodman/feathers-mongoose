'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (modelName, schema, mongoose) {
  var Store = (function () {
    function Store(modelName, schema, mongoose) {
      _classCallCheck(this, Store);

      // Extract
      var Schema = mongoose.Schema;
      var connection = mongoose.connection;

      // Set model name
      this.name = modelName;

      // Create Schema
      this.schema = new Schema(schema);

      // Create Model
      this.model = connection.model(this.name, this.schema);

      return this;
    }

    _createClass(Store, [{
      key: 'getModel',
      value: function getModel() {
        return this.model;
      }
    }, {
      key: 'getSchema',
      value: function getSchema() {
        return this.schema;
      }
    }, {
      key: 'parseQuery',
      value: function parseQuery(query) {
        if (typeof query !== 'object') {
          query = {};
        }
        // Parse query arguments
        for (var k in query) {
          if (typeof query[k] !== 'object') {
            try {
              query[k] = JSON.parse(query[k]);
            } catch (e) {
              console.log('Error:', e);
              query[k] = null;
            }
          }
        }
        return query;
      }
    }, {
      key: 'find',
      value: function find(params, callback) {
        if (typeof params === 'function') {
          callback = params;
          params = {};
        }
        var query = this.parseQuery(params.query);

        this.model.find(query.conditions, query.fields, query.options, function (err, data) {
          callback(err, data);
        });
      }
    }, {
      key: 'get',
      value: function get(id, params, callback) {
        if (typeof params === 'function') {
          callback = params;
          params = {};
        }
        var query = this.parseQuery(params.query);

        this.model.findById(id, query.fields, query.options, function (err, data) {
          callback(err, data);
        });
      }
    }, {
      key: 'create',
      value: function create(data, params, callback) {
        var obj = new this.model(data);
        obj.save(function (err, data) {
          callback(err, data);
        });
      }
    }, {
      key: 'update',
      value: function update(id, data, params, callback) {
        this.model.findByIdAndUpdate(id, data, {
          upsert: true
        }, function (err, data) {
          return callback(err, data);
        });
      }
    }, {
      key: 'remove',
      value: function remove(id, params, callback) {
        this.model.findByIdAndRemove(id, function (err, data) {
          return callback(err, data);
        });
      }
    }]);

    return Store;
  })();

  return new Store(modelName, schema, mongoose);
};

module.exports = exports['default'];
//# sourceMappingURL=index.js.map