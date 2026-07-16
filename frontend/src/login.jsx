import React, { useState, useEffect } from "react";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email.includes("@")) {
      setError('Invalid email configuration. Form requires an "@" symbol.');
      return;
    }

    const letterMatches = password.match(/[a-zA-Z]/g);
    const letterCount = letterMatches ? letterMatches.length : 0;

    if (letterCount < 5) {
      setError(
        `Password contains only ${letterCount} letters. It requires a minimum of 5 alphabetic characters.`,
      );
      return;
    }

    if (isSignUpMode && password !== confirmPassword) {
      setError("Password did not match");
      return;
    }

    try {
      const endpoint = isSignUpMode ? "/auth/register" : "/auth/login";

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccessMessage(data.message);

      if (!isSignUpMode && data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setError("");
    setSuccessMessage("");
    setPassword("");
    setConfirmPassword("");
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "100vh",
      background: isDarkMode
        ? "linear-gradient(135deg, #022c22 0%, #032541 50%, #000000 100%)"
        : "linear-gradient(135deg, #d1fae5 0%, #dbeafe 50%, #f8fafc 100%)",
      color: isDarkMode ? "#ffffff" : "#0f172a",
      transition: "background 0.3s ease, color 0.3s ease",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "24px",
      maxWidth: "1100px",
      width: "100%",
      margin: "0 auto",
      boxSizing: "border-box",
    },
    toggleBtn: {
      padding: "8px 16px",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "600",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.15)"
        : "1px solid rgba(0,0,0,0.1)",
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.03)",
      color: isDarkMode ? "#fff" : "#000",
      backdropFilter: "blur(8px)",
    },
    main: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
    },
    card: {
      width: "100%",
      maxWidth: "420px",
      padding: "40px 32px",
      borderRadius: "24px",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(0,0,0,0.05)",
      backgroundColor: isDarkMode
        ? "rgba(10, 10, 10, 0.8)"
        : "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(16px)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    },
    inputGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      fontSize: "11px",
      fontWeight: "700",
      marginBottom: "6px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: isDarkMode ? "#a1a1aa" : "#64748b",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "12px",
      border: isDarkMode ? "1px solid #27272a" : "1px solid #cbd5e1",
      backgroundColor: isDarkMode ? "#18181b" : "#f8fafc",
      color: isDarkMode ? "#ffffff" : "#0f172a",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    submitBtn: {
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      border: "none",
      fontWeight: "700",
      cursor: "pointer",
      backgroundColor: isDarkMode ? "#10b981" : "#2563eb",
      color: "#ffffff",
      fontSize: "14px",
      marginTop: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      transition: "background-color 0.2s",
    },
    errorAlert: {
      padding: "12px",
      borderRadius: "8px",
      backgroundColor: isDarkMode ? "rgba(239, 68, 68, 0.15)" : "#fef2f2",
      border: "1px solid #ef4444",
      color: "#ef4444",
      fontSize: "13px",
      marginBottom: "20px",
      textAlign: "center",
    },
    successAlert: {
      padding: "12px",
      borderRadius: "8px",
      backgroundColor: isDarkMode ? "rgba(16, 185, 129, 0.15)" : "#ecfdf5",
      border: "1px solid #10b981",
      color: "#10b981",
      fontSize: "13px",
      marginBottom: "20px",
      textAlign: "center",
    },
    switchModeText: {
      textAlign: "center",
      marginTop: "24px",
      fontSize: "13px",
      color: isDarkMode ? "#a1a1aa" : "#64748b",
    },
    switchLink: {
      color: isDarkMode ? "#34d399" : "#2563eb",
      textDecoration: "none",
      fontWeight: "600",
      marginLeft: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontWeight: "800",
              letterSpacing: "-0.02em",
              fontSize: "16px",
            }}
          >
            ACIKIWIR ACADEMY
          </span>
        </div>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={styles.toggleBtn}
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2
              style={{
                margin: "0 0 8px 0",
                fontSize: "26px",
                fontWeight: "800",
                letterSpacing: "-0.03em",
              }}
            >
              {isSignUpMode ? "Create Account" : "Welcome Back"}
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: isDarkMode ? "#71717a" : "#64748b",
              }}
            >
              {isSignUpMode
                ? "Sign up to make new account."
                : "Enter credentials to access website."}
            </p>
          </div>

          {error && <div style={styles.errorAlert}>{error}</div>}
          {successMessage && (
            <div style={styles.successAlert}>{successMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="text"
                placeholder="stacker@acikiwir.com"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                placeholder="Minimum 8 characters"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {isSignUpMode && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Repeat password string"
                  style={styles.input}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            <button type="submit" style={styles.submitBtn}>
              {isSignUpMode ? "Register New Account" : "Sign In to Website"}
            </button>
          </form>

          <div style={styles.switchModeText}>
            {isSignUpMode
              ? "Already signing up in the website?"
              : "First time logging in this website?"}
            <span style={styles.switchLink} onClick={toggleAuthMode}>
              {isSignUpMode ? "Sign In" : "Sign Up Now"}
            </span>
          </div>
        </div>
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "24px",
          fontSize: "11px",
          color: isDarkMode ? "#52525b" : "#94a3b8",
          letterSpacing: "0.05em",
        }}
      >
        &copy; {new Date().getFullYear()} ACIKIWIR ACADEMY &bull; Rawrrrrrr
      </footer>
    </div>
  );
}
