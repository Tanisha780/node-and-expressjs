import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const email = e.target[0].value;
    const password = e.target[1].value;

    if ( !email || !password) {
      toast.warning("Please fill all the fields");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/users/login", {
       
        email,
        password,
      },{
        withCredentials:true
      });
      console.log(data);
      if (data.success) {
        // toast.success("User logged in successfully!!!");
        navigate("/Home");
      } else {
        toast.error("Something went wrong!!!!");
      }
    } catch (e) {
      console.log(e);
      toast.error("wrong credentials!!!!!")
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
          >
           Login 
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
         New to this Website?{" "}
          <Link to={"/signup"} className="text-blue-600 font-semibold">
            {" "}
            SignUp here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
