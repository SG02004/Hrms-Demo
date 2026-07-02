let express = require("express");
let router = require("./Routes/Route")
let cors = require("cors")
let mongoose = require ("./Database/db")
let emp_router = require("./Routes/Emp_route")

let app = express()
app.use(cors());
app.use(express.json());

// "/"  home page  .use to use the middleware in server 
app.use ((req,res,next)=>{
    console.log("HTTP "+ req.method + req.url);
    next();
});
app.use("/",router)
app.use("/",emp_router)
app.listen(5000,()=>{
    console.log("port 5000 is active");
});




