const express = require('express')
const session = require('express-session')
const cookieparser = require('cookie-parser')

var pdf = require("pdf-creator-node");
var fs = require("fs");

var html = fs.readFileSync("index.html", "utf8")


const app = express()
app.use(cookieparser())
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"secret"
}))


var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};




var users = [
    {
      name: "Aditya",
      age: "26",
    },
    {
      name: "Shubham",
      age: "26",
    },
    {
      name: "Aakash",
      age: "26",
    },
  ];


  var document = {
    html: html,
    data: {
      users: users,
    },
    path: "./output.pdf",
    type: "",
  };

const info = {
    name:"Aditya",
    age:23,
    company:"BI"
}

pdf
  .create(document, options)
  .then((res) => {
    
    console.log(res)

  })
  .catch((error) => {
    console.error(error);
  });

  

app.get('/login',(req,res)=>{
    req.session.details = info
    req.session.save()
    res.send("Session generated")
})

app.get("/session",(req,res)=>{
    res.send(req.session.details)
})

app.get("/destroy",(req,res)=>{
    req.session.destroy()
    res.send("Session destroyed")
})

app.listen(7000,()=>{
    console.log("App is running on port 7000 ")
})

