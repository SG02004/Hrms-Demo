import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  let navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email) {
      formError.email = "Email is required";
    }

    if (!formData.password) {
      formError.password = "Password is required";
    }

    setError(formError);

    if (Object.keys(formError).length > 0) {
      console.log("Validation errors:", formError);
      return;
    }

    console.log("Sending login data to backend:", formData);

    axios
      .post("http://localhost:5000/api/login", formData)
      .then((res) => {
        console.log("Login response:", res.data);

        let { success, message, token } = res.data;

        if (success) {
          localStorage.setItem("auth_token", token);
          console.log("Login successful! Token saved.");
          alert(message);  
          navigate("/panel");  
        }
      })
      .catch((err) => {
        console.log("Login error:", err.response?.data);
        if (err.response?.data?.message) {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-md border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-slate-900">Login</h1>

        <form className="mt-8 space-y-4" onSubmit={handleClick}>
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

          <button
            className="w-full rounded-md bg-indigo-900 py-2 text-white transition hover:bg-indigo-800"
            type="submit"
          >
            Login
          </button>
          
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link className="font-semibold text-emerald-600 hover:underline" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
