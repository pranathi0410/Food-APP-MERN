import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate, useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const { login ,user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if(user){
    return <Navigate to="/" replace />
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
   const res= await fetch("http://localhost:5000/api/auth/login",{
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    body:JSON.stringify({
      email,password
    })
   })
   const data= await res.json()
   if(!res.ok){ 
    alert(data.message); 
    return;}
   localStorage.setItem("token",data.token)
   login(data.user,data.token)
   navigate("/")}
   catch(error){
    alert("login failed")
   }
  };

  return (
  <div className="login-page">
    <div className="login-card">
      <h2 className="login-title">Login</h2>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">
          Login
        </button>
          <p style={{ marginTop: "15px" }}>
          New User?  <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
   
  </div>
);
};

export default LoginPage;