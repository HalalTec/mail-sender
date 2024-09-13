const mongoose = require('mongoose');  
require('dotenv').config()
const mongo_string = process.env.MONGO_STRING
mongoose.connect(`${mongo_string}LoginSignup`)  
    .then(() => {  
        console.log('MongoDB connected');  
    })  
    .catch((error) => {  
        console.error('Failed to connect to MongoDB', error);  
    });


const LoginSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model('Collection1',LoginSchema)
module.exports = collection;

