const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Basic route to test server
app.get('/', (req, res) => {
  res.send('Hello, Node.js with PostgreSQL!');
});

// Import user routes
require("./routes/user-route")(app);

// Define the port to listen on
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

