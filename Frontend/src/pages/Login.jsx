
import { useState } from 'react';
import { NavLink, useAsyncError, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth-ContextAPI';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import "../css/hover.css";

export default function Login() {

    const { storeTokenInLS } = useAuth();
    const navigate = useNavigate();
    const [showPasssword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const res_data = await response.json();

            if (response.ok) {

                storeTokenInLS(res_data.token);         //------ Store token in localhost ------//
                toast.success("Login Successful");
                setUserData({
                    email: "",
                    password: ""
                });

                navigate("/");                         //---- After login successful navigating to home page ----//

            } else {
                if (res_data.extraDetails) 
                    {
                        toast.error(res_data.extraDetails[0]);
                    }
                
                toast.error(res_data.msg && res_data.msg);
            }
        } catch (error) {
            console.log("Login", error);

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
        <div className="container">
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
            <div className='card' style={{ width: '27rem', marginTop: "10%" }}>
                <div className="card-body p-4">
                    <h2 className='text-center mb-4'>Login</h2>

                    <div className="mb-3">
                        <TextField type="email" label="Email" variant="outlined" size="small"
                            value={userData.email} onChange={handleChange} name="email" fullWidth

                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaUser />
                                    </InputAdornment>
                                ),
                            }}
                            required />
                    </div>
                    <div className="mb-3">
                        <TextField type={showPasssword ? "text" : "password"} label="Password" variant="outlined" size="small"
                            value={userData.password} onChange={handleChange} name="password" fullWidth

                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <RiLockPasswordFill />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end" style={{ cursor: "pointer" }}>
                                        {!showPasssword ?
                                            <FaEye onClick={handleshowPasssword} /> :
                                            <FaEyeSlash onClick={hidePassword} />}
                                    </InputAdornment>
                                ),
                            }}

                            required />
                    </div>

                    <Button variant="contained" fullWidth size="medium" onClick={handleSubmit}>Login</Button>
                    <div className='mt-2 text-center'><small>Don't have an Account?</small> <NavLink to="/register" className="text-dark">Sign up</NavLink></div>

                </div>
            </div>
            </div>
</div>
        </>)
}