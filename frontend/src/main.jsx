import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./login.jsx";
import Dashboard from "./dashboard.jsx";
import "./main.css";

function AppRouter() {
  const path = window.location.pathname;

  console.log("Current URL Router Path is:", path);

  switch (path) {
    case "/dashboard":
      return <Dashboard />;

    case "/login":
    case "/":
    default:
      return <Login />;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppRouter />
    </div>
  </React.StrictMode>,
);
