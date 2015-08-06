var express = require('express');
var path = require('path');
var peopleData = require('./public/data/people.json');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/data', function(req, res){
    res.json(peopleData);
});

app.get('/*', function(req, res){
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get("port"), function(){
    console.log("listening on port: " + app.get('port'));
    //console.log(peopleData.bob);
})