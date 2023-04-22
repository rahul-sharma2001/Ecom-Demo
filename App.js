const express = require('express')
const app = express();
const morgan = require('morgan');
const cors = require('cors')
const routers = require('./routes/index');
const mongoose = require('mongoose');
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use('/api',routers);

mongoose.set("strictQuery",false)
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.log("Error ocuurred while connecting Database",err);
});

app.listen(3000,()=>{
    console.log(`Server Started At ${process.env.PORT}`);
})
