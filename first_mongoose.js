const mongoose = require('mongoose');
const nameModel = require('./models/names_schema');

let url = 'mongodb://localhost:27017/mongoDemo';

mongoose.connect(url)
.then(() => {
    console.log("Making connection...")
    let newData = nameModel({id: 4, name: "Gabrielle"})
    nameModel.create(newData)
        .then(() => {
            console.log('Added new doc')
        })
        .catch((connectionError) => {
            console.log(connectionError)
        })
    nameModel.find({})
        .then((data) => {
            console.log('Printing Collection')
            console.log(data)
            mongoose.connection.close()
        })
        .catch((connectionError) => {
            console.log(connectionError)
        })
})
.catch((connectionError) => {
    console.log(connectionError)
});
