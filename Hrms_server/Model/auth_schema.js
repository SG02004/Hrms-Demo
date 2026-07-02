
let mongoose = require("mongoose");
let auth_schema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },password:{
        type:String,
        require:true,
    },confirmpassword:{
        type:String,
        require:true,
    }
});
// variable auth_data to store , .model - create collection , 
// "auth_data"- collection name, auth_schema tells the sschema of the collecation 

let auth_data = mongoose.model("auth_data",auth_schema);
module.exports = auth_data;

