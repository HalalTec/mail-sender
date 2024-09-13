const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const collection = require("./mongodb")
const nodeMailer = require('nodemailer')
require('dotenv').config()

const templatePath = path.join(__dirname, '../templates')

app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', templatePath)
app.use(express.urlencoded({extended:false}))
app.get('/', (req,res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {

    try {
        // Check if user exists in database
        const check = await collection.findOne({username: req.body.username})

        if(check.password === req.body.password) {
            res.render('home')
        }else{
            res.send('Password is incorrect')
        }

    } catch (error) {

            res.send('username not found')
        
    }


})

app.get('/signup', (req,res) => {
    res.render('signup')
})

app.post('/signup', async (req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    const check = await collection.findOne({username: req.body.username})
    if(check) { 
        res.send('Username already exists')
        return 0
    }else {
            await collection.insertMany([data])
            res.render('home')
    }

    
})


app.post('/send', (req, res) => {
    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASSWORD
        }
    })

    const mailOptions = {
        from: 'ibnQoyyim',
        to: req.body.rec,
        subject: req.body.sub,
        text: req.body.mess
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Email sent: ', info.response);

          res.send('Email sent successfully')
        }
      });
})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})