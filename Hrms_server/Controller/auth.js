let auth_data = require("../Model/auth_schema");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let SECRET_KEY = "HRMS";

// SIGNUP CONTROLLER

let Signup = async (req, res) => {
  let { name, email, password, confirmpassword } = req.body;
  
  try {
    if (password != confirmpassword) {
      return res
        .status(400)
        .json({ success: false, message: "password does not match" });
    }

    let exs_user = await auth_data.findOne({ email: email });
    if (exs_user) {
      return res
        .status(409)   // ← FIX: was .status() without number
        .json({ success: false, message: "user already exist" });
    }

    
    let hash_password = await bcrypt.hash(password, 10);
    let hash_confirmpassword = await bcrypt.hash(confirmpassword, 10);

    let data = await auth_data({
      name: name,
      email: email,
      password: hash_password,
      confirmpassword: hash_confirmpassword,
    }).save();
    
    let token = jwt.sign({ email: data.email }, SECRET_KEY);

    return res.status(201).json({
      success: true,
      message: "registration successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

// LOGIN CONTROLLER


let Login = async (req, res) => {
  let { email, password } = req.body;

  try {
    // Find user by email in db
    let exs_user = await auth_data.findOne({ email: email });

    if (!exs_user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    // Compare input password with hashed password in DataBase
    let matched_password = await bcrypt.compare(password, exs_user.password);

    if (!matched_password) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }

    // Create token and send back
    let token = jwt.sign({ email: exs_user.email }, SECRET_KEY);

    return res
      .status(200)
      .json({ success: true, message: "login successfull", token: token });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

module.exports = { Login, Signup };
