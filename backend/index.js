const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/userRoutes');

require("dotenv").config();

mongoose.connect(process.env.MONGODB_PORT,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('Connected to database')).catch(e=>console.log(e));


app.use('/api/auth',userRoutes)
app.use(cors());
app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });


const PORT = process.env.PORT;
app.listen(PORT,e=>{
    if (e){
        console.log(e);
    } else {
        console.log(`Server is Started in port ${PORT}`);
    }
});



