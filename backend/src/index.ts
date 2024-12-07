// Main entry point - Initializes and starts the express server
import express from 'express';
import bodyParser from 'body-parser';
import someRoute from './routes/someRoute';
import attestationRoute from './routes/attestationRoute';
import basenameRoute from './routes/getBasename';
import thegraphRoute from './routes/thegraph';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json())

// Middleware to parse JSON
app.use(express.json());

// Route handling
app.use('/api', someRoute);
app.use('/api', attestationRoute);
app.use('/api', basenameRoute);
app.use('/api', thegraphRoute);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});