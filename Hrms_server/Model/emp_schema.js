
let mongoose = require("mongoose");
let emp_schema = mongoose.Schema({
    empName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },department:{
        type:String,
        require:true,
    },joiningDate:{
        type:String,
        require:true,
    },empDob:{
        type:String,
        require:true,
    },empDesignation:{
        type:String,
        require:true,
    },empSalary:{
        type:String,
        require:true,
    },empAddress:{
        type:String,
        require:true,
    }
});
// variable auth_data to store , .model - create collection , 
// "auth_data"- collection name, auth_schema tells the sschema of the collecation 

let emp_data = mongoose.model("emp_data",emp_schema);
module.exports = emp_data;

