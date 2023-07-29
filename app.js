
const express=require('express');
const app=new express();
const morgan=require('morgan');
const PORT=process.env.PORT||3000;
const apiRouter = require('./routes/emp');
const db=require('./db/Connection')
require('dotenv').config();
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(morgan('dev'))
app.use('/api', apiRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



