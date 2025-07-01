const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal.f8j5f.mongodb.net/?retryWrites=true&w=majority&appName=JOB-PORTAL`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
let jobsCollections;

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('job-portal');
    jobsCollections = db.collection('jobs');
    
    // Send a Ping to confirm connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
    return true;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return false;
  }
}

// Connect to MongoDB before starting the server
connectToMongoDB().then((connected) => {
  if (!connected) {
    console.error('Failed to connect to MongoDB. Server will start but database operations will fail.');
  }

  // Post a job
  app.post('/post-job', async (req, res) => {
    try {
      if (!jobsCollections) {
        return res.status(500).send({
          message: 'Database connection not established',
          status: false,
        });
      }

      const body = req.body;
      body.createAt = new Date();
      const result = await jobsCollections.insertOne(body);

      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: 'Failed to insert job! Try again later.',
          status: false,
        });
      }
    } catch (error) {
      console.error('Error posting job:', error);
      return res.status(500).send({
        message: 'Internal server error',
        status: false,
        error: error.message
      });
    }
  });

  // Get all jobs
  app.get('/all-jobs', async (req, res) => {
    try {
      if (!jobsCollections) {
        return res.status(500).send({
          message: 'Database connection not established',
          status: false,
        });
      }

      const jobs = await jobsCollections.find().toArray();
      console.log("All Jobs: ", jobs);
      res.send(jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).send({
        message: 'Internal server error',
        status: false,
        error: error.message
      });
    }
  });

  // Get single job by using id
  app.get("/all-jobs/:id", async (req, res) => {
    try {
      if (!jobsCollections) {
        return res.status(500).send({
          message: 'Database connection not established',
          status: false,
        });
      }

      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({
          message: 'Invalid job ID format',
          status: false
        });
      }

      const job = await jobsCollections.findOne({
        _id: new ObjectId(id)
      });

      if (!job) {
        return res.status(404).send({
          message: 'Job not found',
          status: false
        });
      }

      res.send(job);
    } catch (error) {
      console.error('Error fetching job:', error);
      res.status(500).send({
        message: 'Internal server error',
        status: false,
        error: error.message
      });
    }
  });

  // Get jobs by email
  app.get("/myJob/:email", async (req, res) => {
    try {
      if (!jobsCollections) {
        return res.status(500).send({
          message: 'Database connection not established',
          status: false,
        });
      }

      const email = req.params.email.toLowerCase();
      console.log("Searching for jobs with email:", email);
      
      const jobs = await jobsCollections.find({
        $or: [
          { postedBy: email },
          { postedBY: email }
        ]
      }).toArray();
      
      console.log(`Found ${jobs.length} jobs for email ${email}`);
      
      // Log a sample job if any are found
      if (jobs.length > 0) {
        console.log("Sample job:", jobs[0]);
      }
      
      res.send(jobs);
    } catch (error) {
      console.error("Error fetching jobs by email:", error);
      res.status(500).send({
        message: "Error fetching jobs",
        status: false,
        error: error.message
      });
    }
  });

  // Admin middleware
  const isAdmin = (req, res, next) => {
    const adminEmail = "admin@example.com"; // In production, use environment variables
    const userEmail = req.query.email || req.params.email;
    
    if (userEmail === adminEmail) {
      next();
    } else {
      res.status(403).send({
        message: "Unauthorized: Admin access required",
        status: false
      });
    }
  };

  // Admin routes
  app.get("/admin/stats", isAdmin, async (req, res) => {
    try {
      if (!jobsCollections) {
        return res.status(500).send({
          message: 'Database connection not established',
          status: false,
        });
      }

      const jobs = await jobsCollections.find().toArray();
      const uniqueCompanies = new Set(jobs.map(job => job.companyName || job.CompanyName));
      
      const stats = {
        totalJobs: jobs.length,
        activeJobs: jobs.filter(job => new Date(job.postingDate || job.PostingDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
        totalCompanies: uniqueCompanies.size,
        recentJobs: jobs.slice(-5).map(job => ({
          id: job._id,
          title: job.jobTitle || job.JobTitle,
          company: job.companyName || job.CompanyName,
          postedBy: job.postedBy || job.postedBY,
          postedDate: job.postingDate || job.PostingDate
        }))
      };

      res.send(stats);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).send({
        message: "Error fetching admin statistics",
        status: false,
        error: error.message
      });
    }
  });

  // Delete a job
  app.delete("/job/:id", isAdmin, async (req, res) => {
    try {
      if (!jobsCollections) {
        return res.status(500).send({
          message: 'Database connection not established',
          status: false,
        });
      }

      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({
          message: 'Invalid job ID format',
          status: false
        });
      }

      // Get the email from the query parameter
      const email = req.query.email;
      if (!email) {
        return res.status(400).send({
          message: 'Email is required for authorization',
          status: false
        });
      }

      // First check if the job exists and belongs to the user
      const job = await jobsCollections.findOne({
        _id: new ObjectId(id),
        $or: [
          { postedBy: email.toLowerCase() },
          { postedBY: email.toLowerCase() }
        ]
      });

      if (!job) {
        return res.status(403).send({
          message: 'You are not authorized to delete this job',
          status: false
        });
      }

      const filter = { _id: new ObjectId(id) };
      const result = await jobsCollections.deleteOne(filter);
      
      if (result.deletedCount === 0) {
        return res.status(404).send({
          message: 'Job not found',
          status: false
        });
      }

      res.send(result);
    } catch (error) {
      console.error('Error deleting job:', error);
      res.status(500).send({
        message: 'Internal server error',
        status: false,
        error: error.message
      });
    }
  });

  // Update a job
  app.patch("/update-job/:id", isAdmin, async(req, res) => {
    try {
      if (!jobsCollections) {
        return res.status(500).send({
          message: 'Database connection not established',
          status: false,
        });
      }

      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({
          message: 'Invalid job ID format',
          status: false
        });
      }

      // Get the email from the query parameter
      const email = req.query.email;
      if (!email) {
        return res.status(400).send({
          message: 'Email is required for authorization',
          status: false
        });
      }

      // First check if the job exists and belongs to the user
      const job = await jobsCollections.findOne({
        _id: new ObjectId(id),
        $or: [
          { postedBy: email.toLowerCase() },
          { postedBY: email.toLowerCase() }
        ]
      });

      if (!job) {
        return res.status(403).send({
          message: 'You are not authorized to update this job',
          status: false
        });
      }

      const jobData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...jobData
        },
      };

      const result = await jobsCollections.updateOne(filter, updateDoc, options);
      
      if (result.matchedCount === 0 && !result.upsertedId) {
        return res.status(404).send({
          message: 'Job not found',
          status: false
        });
      }

      res.send(result);
    } catch (error) {
      console.error('Error updating job:', error);
      res.status(500).send({
        message: 'Internal server error',
        status: false,
        error: error.message
      });
    }
  });

  // Default route
  app.get('/', (req, res) => {
    res.send('Hello developer!');
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
