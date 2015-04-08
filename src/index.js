export default function (modelName, schema, mongoose) {

  class Store {
    constructor (modelName, schema, mongoose) {
      // Extract
      let { Schema, connection } = mongoose;

      // Set model name
      this.name = modelName;

      // Create Schema
      this.schema = new Schema(schema);

      // Create Model
      this.model = connection.model(this.name, this.schema);

      return this;
    }
    getModel () {
      return this.model;
    }
    getSchema () {
      return this.schema;
    }

    parseQuery (query) {
      if (typeof query !== 'object') {
        query = {};
      }
      // Parse query arguments
      for (let k in query) {
        if (typeof query[k] !== 'object') {
          try {
            query[k] = JSON.parse(query[k]);
          }
          catch (e) {
            console.log('Error:', e);
            query[k] = null;
          }
        }
      }
      return query;
    }

    find (params, callback) {
      if (typeof params === 'function') {
        callback = params;
        params = {};
      }
      let query = this.parseQuery(params.query);

      this.model.find(query.conditions, query.fields, query.options, function (err, data) {
        callback(err, data);
      });
    }

    get (id, params, callback) {
      if (typeof params === 'function') {
        callback = params;
        params = {};
      }
      let query = this.parseQuery(params.query);

      this.model.findById(id, query.fields, query.options, function (err, data) {
        callback(err, data);
      });
    }

    create (data, params, callback) {
      let obj = new this.model(data);
      obj.save(function (err, data) {
        callback(err, data);
      });
    }

    update (id, data, params, callback) {
      this.model.findByIdAndUpdate(id, data, {
        upsert: true
      }, function (err, data) {
        return callback(err, data);
      });
    }

    remove (id, params, callback) {
      this.model.findByIdAndRemove(id, function (err, data) {
        return callback(err, data);
      });
    }
  }

  return new Store(modelName, schema, mongoose);

}
