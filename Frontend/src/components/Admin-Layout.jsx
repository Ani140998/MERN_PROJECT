import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-2 border rounded">
                    <nav className="nav flex-column mt-3 mb-3">
                        <NavLink to="/admin/dashboard" className="nav-link">Dashboard</NavLink>
                        <NavLink to="/admin/users" className="nav-link">Users</NavLink>
                        <NavLink className="nav-link">Settings</NavLink>
                    </nav>
                </div>
                <div className="col-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}