
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth-ContextAPI';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import "../css/hover.css";

export default function Register() {

    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();
    const [showPasssword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const res_data = await response.json();

            if (response.ok) {

                storeTokenInLS(res_data.token);       //------ Stor token in localhost ------//
                setUserData({
                    name: "",
                    email: "",
                    phone: "",
                    password: ""
                });
                navigate("/login");

            }
            else {

                if (res_data.extraDetails) {
                    for (let e of res_data.extraDetails) {
                        toast.error(e);
                    }
                }
                toast.error(res_data.msg && res_data.msg);
            }



        } catch (error) {
            console.log("Registration:", error);
        }
    }

    const handleshowPasssword = () => {
        if (userData.password) {
            setShowPassword(true);
        }
    }

    const hidePassword = () => {
        setShowPassword(false);
    }

     const handleClose = () => {
        navigate("/");
    }

    return (
        <>
        <div className='container'>
            <div><RxCross1
                className="onHover position-absolute"
                style={{
                    top: '13px',
                    right: '13px',
                    cursor: 'pointer',
                    fontSize: '2.2rem',
                    borderRadius: '50%',
                    padding: '8px',
                    transition: 'backgroundColor 0.3s ease'
                }}
                onClick={handleClose}
            />
            </div>

            <div className="d-flex justify-content-center">
            <div className='card' style={{ width: '30rem', marginTop: "10%" }}>
                <div className='card-body p-4'>
                    <h2 className='text-center mb-4'>Sign-up</h2>

                    <form className='row g-3 needs-validation'>
                        <div className="col-md-6">
                            <TextField type="text" label="Name" variant="outlined" size="small"
                                value={userData.name} onChange={handleChange} name="email" fullWidth
                                required />
                        </div>
                        <div className="col-md-6">
                            <TextField type="email" label="Email" variant="outlined" size="small"
                                value={userData.email} onChange={handleChange} name="email" fullWidth
                                required />
                        </div>
                        <div className="col-md-6">
                            <TextField type="text" label="Phone" variant="outlined" size="small"
                                value={userData.phone} onChange={handleChange} name="phone" fullWidth
                                required />
                        </div>
                        <div className="col-md-6">
                            <TextField type={showPasssword ? "text" : "password"} label="Password" variant="outlined" size="small"
                                value={userData.password} onChange={handleChange} name="password"

                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" style={{ cursor: "pointer" }}>
                                            {!showPasssword ?
                                                <FaEye onClick={handleshowPasssword} /> :
                                                <FaEyeSlash onClick={hidePassword} />}
                                        </InputAdornment>
                                    ),
                                }}

                                fullWidth required />
                        </div>

                        <div className='col-12'>
                            <Button variant="contained" fullWidth size="medium" onClick={handleSubmit}>Sign up</Button>
                            <div className='mt-2 text-center'><small>Already have an Account?</small> <NavLink to="/login" className="text-dark">Sign in</NavLink></div>
                        </div>
                    </form>
                </div>
            </div>
            </div>
            </div>

        </>)
}