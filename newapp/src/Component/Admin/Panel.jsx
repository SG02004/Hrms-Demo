import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

export default function Pannel() {
    let navigate = useNavigate()
    let sidebardata = [
              {label: "Dashboard",path:"/panel/dashboard"},
              
              {label:"Employee Directory",path:"/panel/employees"},
              {label:"Attendance",path:"/panel/attendance"},
              {label:"LeaveRequests",path:"/panel/leave/request"},
              {label:"Payroll",path:"/panel/payroll"},
              {label:"Performance",path:"/panel/performance"},
              {label:"Report",path:"/panel/report"},
              {label:"Setting",path:"/panel/setting"},
              
            ]
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="flex flex-col gap-4 bg-white px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-2xl bg-sky-600 px-4 py-3 text-white shadow-sm">
            <span className="text-lg font-semibold">HRMS Admin</span>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm text-slate-600">
            <button className="rounded-full px-4 py-2 hover:bg-slate-100" onClick={()=>{
                navigate("/panel/dashboard")
            }}>
              Dashboard
            </button>
            <button className="rounded-full px-4 py-2 hover:bg-slate-100" onClick={()=>{
                navigate("/panel/employees")
            }} >
              Employees
            </button>
            <button className="rounded-full px-4 py-2 hover:bg-slate-100" onClick={()=>{
                navigate("/panel/attendance")
            }}>
              Attendance
            </button>
            <button className="rounded-full px-4 py-2 hover:bg-slate-100" onClick={()=>{
                navigate("/panel/payroll")
            }}>
              Payroll
            </button>
          </nav>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-2 shadow-sm">
            <span className="text-sm font-medium">Admin</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-88px)] grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-base font-semibold text-slate-900">
            HRMS Menu
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            {sidebardata.map((item) => (
              <li
                key={item}
                className="rounded-2xl px-4 py-3 hover:bg-slate-50 hover:text-slate-900"
                onClick={()=>{navigate(`${item.path}`)}}
                
              >
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

            <Outlet></Outlet> 
      </div>
      
    </div>
    
  );
}