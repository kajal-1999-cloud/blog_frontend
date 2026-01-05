import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../../utils/fetchApi";
import "./login.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.success("all flieds required");
      return;
    }

    try {
      const response = await fetch(
        "https://blog-backend-4y52.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        toast.error("failed to login");
        throw new Error("Failed to login");
      }

      const data = await response.json();
      dispatch(login(data));
      console.log(data);
      navigate("/");
      toast.success("login successfully");
    } catch (err) {
      toast.error("error in login");

      console.error(err);
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <input type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} /> */}
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
            />

            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
