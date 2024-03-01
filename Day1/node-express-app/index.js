console.log("inside index file")
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'wwwroot')));

app.listen(8080,function(){
    console.log("Server is running on 8080 ,http://localhost:8080/ ");
});
