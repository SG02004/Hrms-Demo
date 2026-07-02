import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Employees() {
  const [empData, setEmpData] = useState({
    empName: "",
    email: "",
    department: "",
    joiningDate: "",
    empDob: "",
    empDesignation: "",
    empSalary: "",
    empAddress: "",
  });

  const [empError, setEmpError] = useState({});

  const [empFormData, setEmpFormData] = useState([]);

  const [open, setOpen] = useState(false);

  const [editId, setEditId] = useState(null);

    const fetchEmployees = () => {
    axios
      .get("http://localhost:5000/api/get/employee")
      .then((res) => {
        console.log("✅ Employees fetched from backend:", res.data);
        if (res.data.success) {
          setEmpFormData(res.data.data);
        }
      })
      .catch((err) => {
        console.log("❌ Error fetching employees:", err);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpData({
      ...empData,
      [name]: value,
    });
    setEmpError({
      ...empError,
      [name]: "",
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!empData.empName.trim()) errors.empName = "Employee name is required";
    if (!empData.email.trim()) errors.email = "Email is required";
    if (!empData.department.trim()) errors.department = "Department is required";
    if (!empData.joiningDate) errors.joiningDate = "Joining date is required";
    if (!empData.empDob) errors.empDob = "Date of birth is required";
    if (!empData.empDesignation.trim()) errors.empDesignation = "Designation is required";
    if (!String(empData.empSalary).trim()) errors.empSalary = "Salary is required";
    if (!empData.empAddress.trim()) errors.empAddress = "Address is required";

    setEmpError(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setEmpData({
      empName: "",
      email: "",
      department: "",
      joiningDate: "",
      empDob: "",
      empDesignation: "",
      empSalary: "",
      empAddress: "",
    });
    setEmpError({});
    setEditId(null); 
  };

  const handleEdit = (employee) => {
    setEditId(employee._id); 

    const formattedDate = employee.joiningDate 
      ? employee.joiningDate.split("T")[0] 
      : "";

    setEmpData({
      empName: employee.empName,
      email: employee.email,
      department: employee.department,
      joiningDate: formattedDate,
      empDob: employee.empDob,
      empDesignation: employee.empDesignation,
      empSalary: employee.empSalary,
      empAddress: employee.empAddress,
    });
    
    setOpen(true); 
  };

  const handleClick = (e) => {
    e.preventDefault();

    let isValid = validateForm();
    if (!isValid) {
      console.log("❌ Validation failed, form has errors");
      return; 
    }

    if (editId) {
      console.log("Sending updated employee data to backend:", empData);
      
      axios
        .put(`http://localhost:5000/api/update/byid/${editId}`, empData)
        .then((res) => {
          console.log("✅ UPDATE SUCCESS:", res.data.message);
          if (res.data.success) {
            fetchEmployees(); // Refresh table
            resetForm();      // Clear form
            setOpen(false);   // Close dialog
          }
        })
        .catch((err) => {
          console.log("❌ Error updating employee:", err);
        });

    } else {
      console.log("Sending new employee data to backend:", empData);

      axios
        .post("http://localhost:5000/api/post/employee", empData)
        .then((res) => {
          console.log("✅ POST SUCCESS:", res.data.message);
          if (res.data.success) {
            fetchEmployees(); 
            resetForm();      
            setOpen(false);   
          }
        })
        .catch((err) => {
          console.log(" Error posting employee:", err);
        });
    }
  };
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
    
    if (isConfirmed) {
      axios
        .delete(`http://localhost:5000/api/delete/byid/${id}`)
        .then((res) => {
          console.log(" DELETE SUCCESS:", res.data.message);
          if (res.data.success) {
            fetchEmployees(); 
          }
        })
        .catch((err) => {
          console.log(" Error deleting employee:", err);
        });
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Employee Table</CardTitle>
          <CardDescription>Employee Details</CardDescription>
          <CardAction>
            <Dialog 
              open={open} 
              onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) resetForm(); 
              }}
            >
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setOpen(true)}>
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto rounded-xl">
                <form onSubmit={handleClick}>
                  <DialogHeader>
                    <DialogTitle>{editId ? "Edit Employee" : "Employee Form"}</DialogTitle>
                    <DialogDescription>
                      {editId ? "Update the employee's details below." : "Fill the form to add Employee Details"}
                    </DialogDescription>
                  </DialogHeader>

                  <FieldGroup>
                    <Field>
                      <Label htmlFor="name-1">Employee Name</Label>
                      <Input
                        id="name-1"
                        name="empName"
                        value={empData.empName}
                        onChange={handleChange}
                      />
                      {empError.empName && (
                        <p className="text-sm text-red-500">{empError.empName}</p>
                      )}
                    </Field>

                    <Field>
                      <Label htmlFor="email-1">Employee Email</Label>
                      <Input
                        id="email-1"
                        name="email"
                        value={empData.email}
                        onChange={handleChange}
                      />
                      {empError.email && (
                        <p className="text-sm text-red-500">{empError.email}</p>
                      )}
                    </Field>

                    <Field>
                      <Label htmlFor="department-1">Employee Department</Label>
                      <Input
                        id="department-1"
                        name="department"
                        value={empData.department}
                        onChange={handleChange}
                      />
                      {empError.department && (
                        <p className="text-sm text-red-500">{empError.department}</p>
                      )}
                    </Field>

                    <Field>
                      <Label htmlFor="joiningdate-1">Joining date</Label>
                      <Input
                        id="joiningdate-1"
                        type="date"
                        name="joiningDate"
                        value={empData.joiningDate}
                        onChange={handleChange}
                      />
                      {empError.joiningDate && (
                        <p className="text-sm text-red-500">{empError.joiningDate}</p>
                      )}
                    </Field>

                    <Field>
                      <Label htmlFor="dob-1">Employee DOB</Label>
                      <Input
                        id="dob-1"
                        name="empDob"
                        value={empData.empDob}
                        onChange={handleChange}
                      />
                      {empError.empDob && (
                        <p className="text-sm text-red-500">{empError.empDob}</p>
                      )}
                    </Field>

                    <Field>
                      <Label htmlFor="designation-1">Employee Designation</Label>
                      <Input
                        id="designation-1"
                        name="empDesignation"
                        value={empData.empDesignation}
                        onChange={handleChange}
                      />
                      {empError.empDesignation && (
                        <p className="text-sm text-red-500">{empError.empDesignation}</p>
                      )}
                    </Field>

                    <Field>
                      <Label htmlFor="salary-1">Employee Salary</Label>
                      <Input
                        id="salary-1"
                        name="empSalary"
                        value={empData.empSalary}
                        onChange={handleChange}
                      />
                      {empError.empSalary && (
                        <p className="text-sm text-red-500">{empError.empSalary}</p>
                      )}
                    </Field>

                    <Field>
                      <Label htmlFor="address-1">Employee Address</Label>
                      <Input
                        id="address-1"
                        name="empAddress"
                        value={empData.empAddress}
                        onChange={handleChange}
                      />
                      {empError.empAddress && (
                        <p className="text-sm text-red-500">{empError.empAddress}</p>
                      )}
                    </Field>
                  </FieldGroup>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" type="button" onClick={resetForm}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit">{editId ? "Update" : "Submit"}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>

        <CardContent>
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300">Emp Name</th>
                <th className="border border-gray-300">Emp Email</th>
                <th className="border border-gray-300">Emp Department</th>
                <th className="border border-gray-300">Emp Joining Date</th>
                <th className="border border-gray-300">Emp Dob</th>
                <th className="border border-gray-300">Emp Designation</th>
                <th className="border border-gray-300">Emp Salary</th>
                <th className="border border-gray-300">Emp Address</th>
                <th className="border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {empFormData.map((employee) => (
                <tr key={employee._id || employee.id}>
                  <td className="border border-gray-300 px-2 py-1">{employee.empName}</td>
                  <td className="border border-gray-300 px-2 py-1">{employee.email}</td>
                  <td className="border border-gray-300 px-2 py-1">{employee.department}</td>
                  <td className="border border-gray-300 px-2 py-1">{employee.joiningDate?.split("T")[0]}</td>
                  <td className="border border-gray-300 px-2 py-1">{employee.empDob}</td>
                  <td className="border border-gray-300 px-2 py-1">{employee.empDesignation}</td>
                  <td className="border border-gray-300 px-2 py-1">{employee.empSalary}</td>
                  <td className="border border-gray-300 px-2 py-1">{employee.empAddress}</td>
                  <td className="border border-gray-300 px-2 py-1 space-x-2">
                    
                    <button 
                      className="text-blue-600 hover:underline font-semibold"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>
                    
                    <button 
                      className="text-red-600 hover:underline font-semibold"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>

        <CardFooter>{/* <p>Card Footer</p> */}</CardFooter>
      </Card>
    </>
  );
}