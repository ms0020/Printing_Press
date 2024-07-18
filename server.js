const express = require('express');
const routes = require('./index.js')

const app = express();
const port = 9000;

app.use(express.json());

// HealthCheck API
app.get('/healthcheck', (req, res) => {
  res.send('I am available!!');
});
app.get('/', (req, res) => {
  res.send('Port is running');
});
// const authenticateToken = require ("./middleware/authorization.js");
// app.use(authenticateToken);

app.use(routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});