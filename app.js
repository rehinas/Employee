const express = require("express");
const app = new express();
const router = express.Router();
const path = require("path");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const PORT = 6080;

require("dotenv").config();
const morgan = require("morgan");
app.use(morgan("dev"));

app.use("/api", router);


const mongoose = require("mongoose");
mongoose
  .connect(process.env.db)
  .then(() => {
    console.log("Connected to my DB");
  })
  .catch(() => {
    console.log("Error!! connection lost");
  });

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
  },
});
const employeeData = mongoose.model("empdetails", employeeSchema);


router.get("/employeelist", async (req, res) => {
  try {
    const data = await employeeData.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json("error");
  }
});



router.get("/employeelist/:id", async (req, res) => {
  try {
    const eId = req.params.id;
    console.log(eId);
    const data = await employeeData.findById(eId);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(" Get error");
  }
});


router.post("/employeelist", async (req, res) => {
  try {
    const item = req.body;
    console.log(item);
    const newData = employeeData(item);
    const saveData = await newData.save();
    res.status(200).json("Post Successful");
  } catch (error) {
    res.status(400).json("post Fail");
  }
});



router.delete("/employeelist/:id", async (req, res) => {
  try {
    const eId = req.params.id;
    console.log(eId);
    const deleted = await employeeData.findByIdAndDelete(eId);
    console.log("Deleted successfully");
    res.send(deleted);
  } catch (error) {
    res.status(400).json("Delete failed");
  }
});


router.put("/employeelist", async (req, res) => {
  try {
    const item = req.body;

    const eId = req.body._id;
    if (!req.body.name || !req.body.location || !req.body.position) {
      return res.status(400).json("All fields are required");
    }

    const updateData = {
      $set: {
        name: req.body.name,
        location: req.body.location,
        position: req.body.position,
        salary: req.body.salary,
      },
    };
    console.log(updateData);
    const updated = await employeeData.findByIdAndUpdate(eId, updateData);
    res.send(updated);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Unable to update");
  }
});
app.use(express.static(path.join(__dirname + "/dist/FrontEnd")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/Frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});



