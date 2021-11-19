const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');

const app = express();

//mongoDB connection
const url = process.env.MONGO_URI;

mongoose.connect(
    url,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log('DB connected!'))
    .catch( (err) => {
    console.log('DB connection failed!');
    console.error(err);
    process.exit(1);
});

//middleware
app.use(express.json({extended: true}));
app.use(cors());
app.use('/api', userRoute);
app.use('/api', productRoute);
app.use('/api', cartRoute);

//port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
