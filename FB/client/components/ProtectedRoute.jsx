import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Login from "./Login";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const tokenVerify = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/users/verify-token",
          {
            withCredentials: true,
          }
        );
        if (data.valid) {
          setIsAuthenticated(true);
        } else {
          toast.error("invalid token");
         navigate("/Login")
        }
      } catch (e) {
        console.log(e);
        toast.error("something went wrong ");
       navigate("/Login");
      } finally {
        setIsLoading(false);
      }
    };
    tokenVerify();
    let id = setInterval(() => {
      tokenVerify();
    }, 1000 * 30);
    return () => {
      clearInterval(id);
    };
  }, []);
  if (isLoading) {
    return <h1>Loading........</h1>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
