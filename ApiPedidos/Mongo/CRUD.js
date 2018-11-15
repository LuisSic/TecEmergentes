const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var db;
var collection;


MongoClient.connect("mongodb://connectionuser:AppMenu1234.@clusterappmenu-shard-00-00-1mxum.gcp.mongodb.net:27017,clusterappmenu-shard-00-01-1mxum.gcp.mongodb.net:27017,clusterappmenu-shard-00-02-1mxum.gcp.mongodb.net:27017/test?ssl=true&replicaSet=clusterappmenu-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true })
.then(client => {
  db = client.db('restaurant');
  collection = db.collection('OrderFood');
  console.log(':D');
}).catch(error => console.error('Something went wrong :c ' + error));

module.exports = {
    listPedido: function()
    {
        return collection.find({}).toArray();
    },
    SearchPedido: function(id)
    {
        return collection.find({ _id: ObjectId(id) }).toArray();
    },
    SavePedido: function(objPedido)
    {
        return collection.insertOne(objPedido);
    },

    UpdatePedido: function(id, objPedido)
    {
        return collection.updateOne({ _id: ObjectId(id) }, {$set: objPedido});
    },
    DeletePedido: function(id)
    {
        return collection.deleteOne({ _id: ObjectId(id) });
    }
};