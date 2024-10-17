const mongoose = require('mongoose');
const budgetModel = require('./models/budget_data_schema');

let url = 'mongodb://localhost:27017/pb';

mongoose.connect(url);

var db = mongoose.connection;

async function fetchBudgetData(budgetObj) {
    await db.once('open', async function () {
        console.log("Connected to the database.");

        try {
            for (let budget of budgetObj) {
                await budgetModel.updateOne(
                    { title: budget.title }, // filter by title
                    { $set: budget }, // update the budget
                    { upsert: true } // insert if it doesn't exist
                );
            }

            console.log("Data successfully stored or updated.");
        } catch (err) {
            console.error('DB update error:', err);
            throw err;
        }

       
        try {
            const budgetDB = await budgetModel.find().lean();
            db.close(); 
            return budgetDB;
        } catch (err) {
            console.error("Error fetching data:", err);
            db.close();
        }
    });
}
module.exports = { fetchBudgetData };
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

