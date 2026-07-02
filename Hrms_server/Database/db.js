let mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/hrms").then(()=>{
    console.log("database connected successfully")
}).catch(()=>{
    console.log("database not connected")
});

module.exports = mongoose;