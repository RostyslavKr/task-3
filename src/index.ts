import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import notesRoute from './routes/notes.route';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/', notesRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});