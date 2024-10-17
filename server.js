// Budget API
const mongoose = require('mongoose');
const budgetModel = require('./models/budget_data_schema');
const { fetchBudgetData } = require('./update_budget');
const express = require('express');
const app = express();
const port = 3001;
let url = 'mongodb://localhost:27017/pb';



mongoose.connect(url)
.then(() => {
    console.log("Making connection...")
})
.catch((connectionError) => {
    console.log(connectionError)
});

app.use(express.static(__dirname + '/public'));

app.get('/budget', async (req, res) => {
    try {
        data = await budgetModel.find({});
        res.json(data);
    } catch (error) {
        res.status(500).send(error);
    }
    console.log(data);
});

app.use(express.json());

app.post('/update', async (req, res) => {
    try {
        const budgetData = req.body; // Get the data from the POST request body
        if (!Array.isArray(budgetData) || budgetData.length === 0) {
            return res.status(400).json({ message: "Invalid or empty budget data" });
        }

        // Pass the data to fetchBudgetData function
        const updatedData = await fetchBudgetData(budgetData);

        res.json({
            message: "Budget data successfully updated",
            data: updatedData
        });
    } catch (err) {
        console.error("Error updating budget data:", err);
        res.status(500).json({ message: "Error updating budget data", error: err });
    }
});



app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});