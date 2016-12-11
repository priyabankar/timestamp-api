var express = require("express");
var path = require("path");
var moment = require('moment');
var app = express();

//app.set('port', (process.env.PORT || 5000));

app.get('/',function(req,res){
     var fileName = path.join(__dirname, 'index.html');
   res.sendFile(fileName,function(err){
       if (err)
        return console.error(err);
    console.log("File Sent");
   }); 
});

//if we want to use index.html file from client folder then we need to use this middleware.
//app.use(express.static(path.resolve(__dirname, 'client')));

app.get('/:timestamp',function(req,res){
    var myDate;
  if(/^\d{8,}$/.test(req.params.timestamp)) {
    myDate = moment(req.params.timestamp, "X");
  } else {
    myDate = moment(req.params.timestamp, "MMMM D, YYYY");
  }

  if(myDate.isValid()) {
    res.json({
      unix: myDate.format("X"),
      natural: myDate.format("MMMM D, YYYY")
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }
   
});

app.listen(8080, function(){
  console.log('Listening on port: 8080');
});
