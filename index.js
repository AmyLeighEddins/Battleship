const express = require('express');
const path = require('path');

const app = express();

// set port number
app.set('port', (process.env.PORT || 3333));
// serve the public and node modules folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// listen on the port
app.listen(app.get('port'), () => {
  console.log('Battleship app is running on port', app.get('port'));
});
