import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Panel from "./Component/Admin/Panel.jsx";
import Login from "./Component/Loginpage/Login.jsx";
import Signup from "./Component/Signup/Signup.jsx";
import Dashboard from "./Component/Admin/Dashboard.jsx";
import Employees from "./Component/Admin/Pages/Employees.jsx";
import Attendance from "./Component/Admin/Pages/Attendance.jsx";
import Performance from "./Component/Admin/Pages/Performance.jsx"
import Payroll from "./Component/Admin/Pages/Payroll.jsx";
import Setting from "./Component/Admin/Pages/Setting.jsx";
import LeaveRequests from "./Component/Admin/Pages/LeaveRequests.jsx";
import Report from "./Component/Admin/Pages/Report.jsx";
import  RequireAuth  from "./Component/RequireAuth.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/panel"  element= {<RequireAuth><Panel/></RequireAuth>}    >
          <Route index element={<Dashboard/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="employees" element={<Employees/>}/>
          <Route path="leave/request" element={<LeaveRequests/>}/>
          <Route path="payroll" element={<Payroll/>}/>
          <Route path="performance" element={<Performance/>}/>
          <Route path="report" element={<Report/>}/>
          <Route path="setting" element={<Setting/>}/>
          <Route path="attendance" element={<Attendance/>}/>


          </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


