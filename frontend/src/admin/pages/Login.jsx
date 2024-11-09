import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../context/AdminLoggedIn";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const { setIsLoggedIn } = useLoginContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const login = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/login/admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
      }

      setIsLoggedIn(true);
      navigate("/admin");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={data.username}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={(e) => handleChange(e)}
        />
        <button onClick={login} type="button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
