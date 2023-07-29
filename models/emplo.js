const mongoose = require('mongoose');
const Schema = mongoose.Schema({
  EmployeeName: String,
  Location: String,
  Position: String,
  Salary: Number
});

const empdetail = mongoose.model('empdetail', Schema);

module.exports = empdetail;
