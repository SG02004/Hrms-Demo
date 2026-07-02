let express = require("express")
let {Signup, Login} = require("../Controller/auth")

let router = express.Router()

router.post("/api/login",Login)
router.post("/api/signup", Signup)

module.exports = router

