const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.port || 3000;




app.get('/', function (req, res) {
  res.send('Welcome to my hotel.. How can i help you?');
})

app.get('/chicken', (req, res) => {
  res.send('Chicken is  available');
})

app.get('/idli', (req, res)=>{
  var customized_idli = {
    name : 'rava idli',
    size : '10 cm in diameter',
    is_sambhar : true,
    is_chutney : false
  }
  res.send(customized_idli);
})


// import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');
 

// use routes files
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);
  



app.listen(PORT, ()=>{
  console.log('Server is running on port 3000');
})