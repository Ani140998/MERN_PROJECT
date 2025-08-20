import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";

export const AuthContext = createContext();


// AuthProvider function is responsible to provide data to all the child components
export const AuthProvider = ({ children }) => {



    // ---- Function for storing token in localstorage, this function is called from login.jsx and register.jsx page ------    
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken)
    };



    // ------------------------------------ Logout function logic ------------------------------------------------
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [products, setProducts] = useState([]);
    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        setUser("");
        return localStorage.removeItem("token");
    }


    // ------------------ JWT Authentication - to get currently logged in userdata -----------------------
    const userAuthentication = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/users`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        } catch (error) {
            console.error("error fetching user data");
        }

    }

    const getProducts = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/products`, {
              method: "GET",
        });

        if(response.ok){
            const data = await response.json();
            setProducts(data);
        }
        } catch (error) {
            console.log(`Product, ${error}`)
        }
    }

    useEffect(() => {
        userAuthentication();
        getProducts();
    }, []);



    return (
        <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn, user, token, products }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook creation (useAuth)
export const useAuth = () => {
    return useContext(AuthContext);
};
