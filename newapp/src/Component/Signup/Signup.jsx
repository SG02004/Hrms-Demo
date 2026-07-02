import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  let navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,    
      [name]: value,  
    });
    setError({
      ...error,
      [name]: "",     
    });
  };


  const handleClick = (e) => {
    e.preventDefault();  
    handleValidate(formData);
  };

  const handleValidate = (formData) => {
    const formError = {};

    if (!formData.name) {
      formError.name = "Name is required";
    }

    if (!formData.email) {
      formError.email = "Email is required";
    }

    if (!formData.password) {
      formError.password = "Password is required";
    }

    if (!formData.confirmpassword) {
      formError.confirmpassword = "Confirm password is required";
    }

    if (
      formData.password &&
      formData.confirmpassword &&
      formData.password !== formData.confirmpassword
    ) {
      formError.confirmpassword = "Passwords do not match";
    }

    setError(formError);

    
    if (Object.keys(formError).length > 0) {
      console.log("Validation errors:", formError);
      return;  
    }

    console.log("Sending signup data to backend:", formData);

    axios
      .post("http://localhost:5000/api/signup", formData)
      
      .then((res) => {
        
        console.log("Signup response:", res.data);

        let { success, message, token } = res.data;

        if (success) {
          localStorage.setItem("auth_token", token);
          console.log("✅ Signup successful! Token saved.");
          alert(message);  
          navigate("/login");  
        }
      })
      .catch((err) => {
        console.log("Signup error:", err.response?.data);
        if (err.response?.data?.message) {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-md border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-slate-900">Sign Up</h1>

        <form className="mt-8 space-y-4" onSubmit={handleClick}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-emerald-600">Name</label>
            <input
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {error.name && <p className="mt-1 text-sm text-red-500">{error.name}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-emerald-600">Email</label>
            <input
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {error.email && <p className="mt-1 text-sm text-red-500">{error.email}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-emerald-600">
              Password
            </label>
            <input
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {error.password && <p className="mt-1 text-sm text-red-500">{error.password}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-emerald-600">
              Confirm Password
            </label>
            <input
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
            />
            {error.confirmpassword && (
              <p className="mt-1 text-sm text-red-500">{error.confirmpassword}</p>
            )}
          </div>

          <button
            className="w-full rounded-md bg-indigo-900 py-2 text-white transition hover:bg-indigo-800"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link className="font-semibold text-emerald-600 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

