// components/Login.tsx
import React, { useState,useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "../graphql/queries/authqueries";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [login, { loading, data, error }] = useLazyQuery(LOGIN, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
        const token = data?.Login; // capital 'L'
        if (token) {
          localStorage.setItem("token", token);
        //   console.log("Login successful:", token);
        setIsAuthenticated(true);
         // navigate("/clinic");
      }
    },
  });

  useEffect(() => {
    const token1 = localStorage.getItem('token');
    if (token1) {
      navigate('/clinic');
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ variables: { email, password } });
  };

  return (
    <div style={{ margin: "100px auto", width: "300px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "15px" }} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </form>
    </div>
  );
};

export default Login;
