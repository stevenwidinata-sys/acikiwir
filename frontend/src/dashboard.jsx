import { useNavigate } from "react-router-dom";
import useAuth from "./context/useAuth";

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>Checking security clearance...</div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "sans-serif",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <div
        style={{
          background: "#e6f4ea",
          border: "1px solid #137333",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ color: "#137333" }}>🔓 Passed the Guard!</h2>

        <p>
          <strong>Name:</strong> {user?.name}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            background: "#d93025",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
