const mongoose = require('mongoose');
const budgetModel = require('./models/budget_data_schema');

let url = 'mongodb://localhost:27017/pb';

mongoose.connect(url)
.then(() => {
    console.log("Making connection...")
    budgetModel.find({})
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

