const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Entry = require('./Models/Schema'); 

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://sanjanarach7:miniprj@cluster0.jqwqmc0.mongodb.net/miniprj?retryWrites=true&w=majority")
    .then(() => {
        console.log('MongoDB connection success');
    })
    .catch((err) => {
        console.error('MongoDB connection failed', err);
    });

const USER_ID = "Sanjana7";
const EMAIL = "sanjana_racharla@srmap.edu.in";
const ROLL_NUMBER = "AP21110010668";

//post Method
app.post('/bfhl', async (req, res) => {
    try {
        console.log('Received request body:', req.body); 

        const { data } = req.body;

        if (!Array.isArray(data)) {
            console.log('Invalid data format'); 
            return res.status(400).json({
                is_success: false,
                user_id: USER_ID,
                email: EMAIL,
                roll_number: ROLL_NUMBER,
                numbers: [],
                alphabets: [],
                highest_alphabet: []
            });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const highestAlphabet = alphabets.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).pop();

        
        const entry = new Entry({
            data,
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet ? [highestAlphabet] : []
        });

        await entry.save();

        return res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highestAlphabet ? [highestAlphabet] : []
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({
            is_success: false,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers: [],
            alphabets: [],
            highest_alphabet: []
        });
    }
});

//Get Method
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server listening on port:', port);
});
