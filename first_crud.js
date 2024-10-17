var MongoClient = require('mongodb').MongoClient,
Db = require('mongodb').Db;

let url = 'mongodb://localhost:27017/mongoDemo';
var new_client = new MongoClient(url, { monitorCommands: true });


//connect to database
//perform operation
//close database connection

async function newConnect() {
    await new_client.connect();
        console.log('Connected to database.');
}

newConnect()
.then(console.log("closing connection..."))
.catch(console.error("Connection failed."))
.finally(() => new_client.close());




