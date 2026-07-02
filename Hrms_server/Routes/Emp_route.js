let express = require("express")


let {PostEmpAPI,GetEmpAPI,UpdateEmpAPI,UpdateEmpByIdAPI,DeleteEmpByIdAPI} = require("../Controller/emp_controller")

let emp_router = express.Router()
emp_router.post("/api/post/employee",PostEmpAPI)
emp_router.get("/api/get/employee",GetEmpAPI)
emp_router.put("/api/update/byemail",UpdateEmpAPI)
emp_router.put("/api/update/byid/:id",UpdateEmpByIdAPI)
emp_router.put("/api/delete/byid/:id",DeleteEmpByIdAPI)



module.exports = emp_router

// for seprate api we make route for that -> then controller of api in controller folder to handle logic
// emp schema with the schema 
// then empcontroller to handle the logic 

// simple 1 id : sent through req.params , 