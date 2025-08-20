import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import './App.css'
import Register from "./pages/Register"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Error from "./pages/Error"
import Logout from "./pages/Logout"
import AdminLayout from "./components/Admin-Layout";
import AdminUsers from "./pages/Admin-Users"
import AdminDashboard from "./pages/Admin-Dashboard"
import { useLocation } from "react-router-dom";

function App() {

  const location = useLocation();

  // Define routes where Navbar should be hidden
  const hideNavbarRoutes = ['/login', '/register'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);


  return (
    <>

      {!shouldHideNavbar && <Navbar />}
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<Error />} />
              <Route path="/admin" element={<AdminLayout />} >
                <Route path="users" element={<AdminUsers />} />
                <Route path="dashboard" element={<AdminDashboard />} />
              </Route>

            </Routes>
        <Footer />

    </>
  )
}

export default App
