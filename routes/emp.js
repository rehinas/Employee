const express = require('express');
const router = express.Router();
const Empdata = require('../models/emplo');


router.get('/employeelist', async (req, res) => {
  try {
    const data = await Empdata.find();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json('Connection failed');
  }
});

router.get('/employeelist/:id', async (req, res) => {
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


router.post('/employeelist', async (req, res) => {
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

router.delete('/employeelist/:id', async (req, res) => {
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

router.put('/employeelist/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const updatedEmployee = await Empdata.findByIdAndUpdate(id, updatedData);

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

module.exports = router;
