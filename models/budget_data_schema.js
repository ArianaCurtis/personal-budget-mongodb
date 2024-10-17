const mongoose = require('mongoose');

const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v);

const budgetdataSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        validator: [colorValidator, 'Invalid color'],
        required: true,
    }
}, { collection: 'budgets'});

module.exports = mongoose.model('budgetdata', budgetdataSchema);