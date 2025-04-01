const express = require('express');
const app = express.Router();
const PORT =process.env.PORT || 4000;
const path = require('path');



app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname,'index.html'));
});


module.exports = app;