import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

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

app.listen(port, () => {
  console.log("Server is running on port 5000");
});
