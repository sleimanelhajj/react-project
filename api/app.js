const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;

const url =
  "mongodb+srv://sleimanelhajj:4ZlYLHFmusQm1N3G@cluster0.jdeth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "jobsdb";
let db;

// establish the mongoDB connection with atlast
MongoClient.connect(url)
  .then((client) => {
    console.log("Connected to MongoDB Atlas");
    db = client.db(dbName); // Get a reference to the database
    console.log("DB Created");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// adding a jobs endpoint
app.post("/api/jobs", async (req, res) => {
  try {
    const newJob = {
      title: req.body.title,
      type: req.body.type,
      location: req.body.location,
      description: req.body.description,
      salary: req.body.salary,
      company: {
        name: req.body.company.name,
        description: req.body.company.description,
        contactEmail: req.body.company.contactEmail,
        contactPhone: req.body.company.contactPhone,
      },
    };
    const result = await db.collection("jobs").insertOne(newJob);
    res
      .status(201)
      .json({ message: "Job added successfully!", jobId: result.insertedId });
  } catch (error) {
    console.error("Error adding job: ", error);
    res.status(500).json({ message: "Server error, unable to add job." });
  }
});

// how about getting the jobs??

app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await db.collection("jobs").find({}).toArray();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: " server error, unable to fetch jobs" });
  }
});

// getting the info for a specif job
const { ObjectId } = require("mongodb");

app.get("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    // Fetch job by ObjectId
    const job = await db.collection("jobs").findOne({ _id: new ObjectId(id) });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Server error, unable to fetch job" });
  }
});

// deleting a job

app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(
      "Received request to delete job with ID:",
      id,
      "Type:",
      typeof id
    ); // Debugging

    if (!ObjectId.isValid(id)) {
      console.error("Invalid job ID format received:", id);
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    const objectId = new ObjectId(id.trim()); // Ensure it's an ObjectId
    const result = await db
      .collection("jobs")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Server error, unable to delete job." });
  }
});

// updating a job
app.put("/edit-job/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    const updatedJob = {
      title: req.body.title,
      type: req.body.type,
      location: req.body.location,
      description: req.body.description,
      salary: req.body.salary,
      company: {
        name: req.body.company.name,
        description: req.body.company.description,
        contactEmail: req.body.company.contactEmail,
        contactPhone: req.body.company.contactPhone,
      },
    };

    const result = await db
      .collection("jobs")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedJob });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job updated successfully" });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Server error, unable to update job." });
  }
});
app.listen(port, () => {
  console.log("Server is running on port 5000");
});
