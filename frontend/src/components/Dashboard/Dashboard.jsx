import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
import "./Dashboard.css";

function Dashboard({ setIsLoggedIn }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user session info
    const fetchSession = async () => {
      try {
        const res = await api.get("/session");
        if (res.data.loggedIn) {
          setUser(res.data.user);
        } else {
          navigate("/login"); // redirect if no session
        }
      } catch (err) {
        navigate("/login");
      }
    };
    fetchSession();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      // Re-check session to ensure cookie is cleared
      try {
        const sessionRes = await api.get("/session");
        if (!sessionRes.data.loggedIn) {
          setIsLoggedIn(false);
          navigate("/login");
        } else {
          // Session still exists, show error or force reload
          setIsLoggedIn(false);
          navigate("/login");
        }
      } catch (sessionErr) {
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <header className="dashboard-header">
        <h1 className="dashboard-logo">Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <section className="welcome-section">
          <h2>Welcome User</h2>
          <h3 style={{margin:"10px 0px 15px 0px"}}>your mail is <span style={{color:"purple"}}>{user?.email}</span></h3>
          <p style={{textAlign:"center"}}>Your personalized dashboard overview</p>
        </section>

        <section className="cards-container">
          <div className="card">
            <h3>📊 Analytics</h3>
            <p>Track user activity and insights here.</p>
          </div>
          <div className="card">
            <h3>📚 Lessons</h3>
            <p>Access your saved lessons and materials.</p>
          </div>
          <div className="card">
            <h3>💬 Doubts</h3>
            <p>Ask questions and resolve doubts instantly.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
