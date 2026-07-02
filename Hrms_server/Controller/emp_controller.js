let emp_data = require("../Model/emp_schema");

// POST EMPLOYEE 


let PostEmpAPI = async (req, res) => {
  let {
    empName,
    email,
    department,
    joiningDate,
    empDob,
    empDesignation,
    empSalary,
    empAddress,
  } = req.body;

  try {
    let data = await emp_data({
      empName: empName,
      email: email,
      department: department,
      joiningDate: joiningDate,
      empDob: empDob,
      empDesignation: empDesignation,
      empSalary: empSalary,
      empAddress: empAddress,
    }).save();

    return res.status(201).json({
      success: true,
      message: "employee added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

// GET ALL EMPLOYEES


let GetEmpAPI = async (req, res) => {
  try {
    let data = await emp_data.find();
    // .find() with no filter = get ALL documents
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
};

// UPDATE EMPLOYEE BY EMAIL
let UpdateEmpAPI = async (req, res) => {
  let {
    empName,
    email,
    department,
    joiningDate,
    empDob,
    empDesignation,
    empSalary,
    empAddress,
  } = req.body;

  try {
    let exs_emp = await emp_data.findOne({ email: email });
    if (!exs_emp) {
      return res
        .status(404)
        .json({ success: false, message: "record not found" });
    }
    let update_emp = await emp_data.updateOne(
      { email: email },
      {
        $set: {
          empName: empName,
          email: email,
          department: department,
          joiningDate: joiningDate,
          empDob: empDob,
          empDesignation: empDesignation,
          empSalary: empSalary,
          empAddress: empAddress,
        },
      }
    );
    return res
      .status(200)
      .json({ success: true, message: "record update successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
};

// UPDATE EMPLOYEE BY ID 
let UpdateEmpByIdAPI = async (req, res) => {
  console.log(req.body);
  console.log(req.params);

  let { id } = req.params;
  let {
    empName,
    email,
    department,
    joiningDate,
    empDob,
    empDesignation,
    empSalary,
    empAddress,
  } = req.body;

  try {
    let update_emp = await emp_data.findByIdAndUpdate(id, {
      empName: empName,
      email: email,
      department: department,
      joiningDate: joiningDate,
      empDob: empDob,
      empDesignation: empDesignation,
      empSalary: empSalary,
      empAddress: empAddress,
    });
    if (!update_emp) {
      return res
        .status(404)
        .json({ success: false, message: "record not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "record updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
};
// DELETE EMPLOYEE BY ID
let DeleteEmpByIdAPI = async (req, res) => {
  let { id } = req.params;

  try {
    let delete_emp = await emp_data.findByIdAndDelete(id);
    
    if (!delete_emp) {
      return res.status(404).json({ success: false, message: "record not found" });
    }
    
    return res.status(200).json({ success: true, message: "record deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "something went wrong" });
  }
};


module.exports = { PostEmpAPI, GetEmpAPI, UpdateEmpAPI, UpdateEmpByIdAPI,DeleteEmpByIdAPI };