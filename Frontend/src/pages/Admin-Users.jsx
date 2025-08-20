import { useEffect } from "react"
import { useAuth } from "../store/auth-ContextAPI";
import { useState } from "react";
import DataTable from 'react-data-table-component';
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { FiSearch } from "react-icons/fi";
import InputAdornment from "@mui/material/InputAdornment";

export default function AdminUsers() {

    const { token } = useAuth();
    const [allUsers, setAllUsers] = useState([]);

    const columns = [
        {
            name: "Name",
            selector: row => row.name,
            sortable: true

        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true

        },
        {
            name: "Phone",
            selector: row => row.phone,
            sortable: true

        },
        {
            name: "Actions",
            button: "true",
            cell: row => (<button className="btn btn-white border border-danger btn-sm" onClick={() => handleDelete(row._id)}><MdDeleteForever style={{ color: "grey" }} /></button>)

        }

    ];

    const handleDelete = async (id) => {
        toast(
            ({ closeToast }) => (
                <div>
                    <p>Are you sure you want to delete this user?</p>
                    <button className="btn btn-light btn-sm border" onClick={async () => {
                        // Your delete logic here
                        try {
                            const response = await fetch(`http://localhost:5000/api/admin/user/delete/${id}`, {
                                method: "DELETE",
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                }
                            });

                            if (response.ok) {
                                toast.success("User Deleted Successfully!");
                                getAllUsers();
                            }

                        }
                        catch (error) {
                            console.log(error);
                        }
                        closeToast();
                    }}>
                        Yes
                    </button>
                    <button className="btn btn-light ms-2 btn-sm border" onClick={closeToast}>No</button>
                </div>
            ),
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
            }
        );


    }


    const getAllUsers = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = await response.json();
            setAllUsers(data);

        }
        catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getAllUsers();
    }, []);


    const customStyles = {
        headCells: {
            style: {
                backgroundColor: 'white',
                color: 'grey',
                fontWeight: 'bold',
                fontSize: '16px',
            },
        },
    };


    const TableHeader = (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0 }}>Users List</h4>
            <TextField
                variant="outlined"
                placeholder="Search Users..."
                size="small"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <FiSearch />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    backgroundColor: 'white',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'grey',
                        },
                        '&:hover fieldset': {
                            borderColor: 'grey',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'lightgrey',
                        },
                    },

                }}
            />
        </div>
    );

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    {allUsers ?
                        <>
                            <DataTable
                                title={TableHeader}
                                columns={columns}
                                data={allUsers}
                                button={true}
                                customStyles={customStyles}
                                pagination
                                highlightOnHover
                            /></> :
                        <h3>Access Denied, Not an Admin</h3>}
                </div>
            </div>
        </div>
    )
}