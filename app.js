// Task1: initiate app and run server at 3000
const express=require('express');
const app=new express();
const morgan=require('morgan');
require('dotenv').config();
const PORT=process.env.PORT;
const connections=process.env.connections;
app.use(express.urlencoded({extended: true}));
app.use(express.json())
console.log(PORT)

console.log(`port is running on ${PORT}`)


const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
const mongoose=require('mongoose')
mongoose.connect(connections)
.then(()=>{
    console.log("connected to db")
})
.catch(()=>{
    console.log("not connected")
})
//schema creation
const Schema=mongoose.Schema({
    EmployeeName:String,
    Location:String,
    Position:String,
    Salary:Number
});
const Empdata=mongoose.model('emp',Schema)

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',async(req,res)=>{
    try {
        const data=await Empdata.find();
        console.log(data)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json('connection failed')
    }
})





//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Empdata.findById(id);
  
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ error: 'Employee not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve employee data' });
    }
  });
  





//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}



app.post('/api/employeelist', async (req, res) => {
    try {
      const item = req.body;
      const newEmployee = new Empdata(item);
      const savedEmployee = await newEmployee.save();
      console.log(savedEmployee);
      res.status(200).json('Employee added successfully');
    } catch (error) {
      console.error(error);
      res.status(400).json('Failed to add employee');
    }
  });
  


//TODO: delete a employee data from db by using api '/api/employeelist/:id'


app.delete('/api/employeelist/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deletedEmployee = await Empdata.findByIdAndDelete(id);
  
      if (deletedEmployee) {
        console.log('Employee deleted successfully');
        res.json('Employee deleted successfully');
      } else {
        res.status(404).json({ error: 'Employee not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json('Failed to delete employee');
    }
  });
  


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist', async (req, res) => {
    try {
      const updatedata = req.body;
      const id = updatedata._id;
      const updatedEmployee = await Empdata.findByIdAndUpdate(id, updatedata);
  
      if (updatedEmployee) {
        console.log('Employee updated successfully');
        res.json('Employee updated successfully');
      } else {
        res.status(404).json({ error: 'Employee not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json('Failed to update employee');
    }
  });
  


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



