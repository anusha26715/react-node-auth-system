import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
import "./Register.css"; // 👈 separate CSS for Register

function Register({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 chars with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await api.post("/register", { email, password });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      setErrors({ api: err.response?.data?.error || "Something went wrong" });
    }
  };

  return (
    <div className="register-wrapper">
      <h2 className="register-title">Create Account</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input
          className="register-input"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="register-error">{errors.email}</p>}

        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="register-error">{errors.password}</p>}

        <button type="submit" className="register-btn">
          Sign Up
        </button>
        {errors.api && <p className="register-error">{errors.api}</p>}
        <p className="login-link">
          Already Have An Account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
