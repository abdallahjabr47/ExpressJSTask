const express = require('express');
const app = express();
const todosRoutes = require('./Express');

app.use(express.json());
app.use(todosRoutes);
app.use(express.static('public'));

// to start the server
app.listen(3000, () => {
  console.log('The server is running on port 3000');
});