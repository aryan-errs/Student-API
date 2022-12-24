const express = require('express');
const app = express();
const port = process.env.port || 3000;
const mongoose = require('mongoose');


mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/studentdata', {
    useNewurlParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", ()=>{
    console.log("DataBase Connected!");
})

app.use(express.static('public'));
app.use(express.json());

app.use('/api', require('./routes/api'));
app.use(function(err,req,res,next){
    console.log(err);
    res.status(422).send({error: err.message});
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});