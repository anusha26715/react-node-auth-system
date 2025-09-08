import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
import "./Login.css"; // 👈 separate CSS for Login

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await api.post("/login", { email, password });
      alert(res.data.message);
      // Re-check session to ensure cookie is set
      try {
        const sessionRes = await api.get("/session");
        if (sessionRes.data.loggedIn) {
          setIsLoggedIn(true);
          navigate("/dashboard");
        } else {
          setErrors({ api: "Session not established. Please try again." });
        }
      } catch (sessionErr) {
        setErrors({ api: "Session check failed. Please try again." });
      }
    } catch (err) {
      setErrors({
        api: err.response?.data?.error || "Login failed. Please try again.",
      });
    }
  };

  return (
    <div className="login-box">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          className="login-input"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="login-error">{errors.email}</p>}

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="login-error">{errors.password}</p>}

        <button type="submit" className="login-btn">
          Sign In
        </button>
        {errors.api && <p className="login-error">{errors.api}</p>}
        <p className="register-link">
          Do Not Have An Account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
