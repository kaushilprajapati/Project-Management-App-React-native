const mongoose = require('mongoose');
require("dotenv").config({ path: "./config/.env" });
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();
const employeeRoutes = require('./routes/routes.js');
const userRoutes = require('./routes/userRoutes.js');
app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    dbName: 'projectManagement'
}).then(()=>{
    console.log('Database Connection is ready...')
    app.use('/employees',employeeRoutes);
    app.use('/users', userRoutes);
    app.listen(3000, ()=>{
    console.log('server is running http://localhost:3000');
})
})
.catch((err)=> {
    console.log(err);
})





