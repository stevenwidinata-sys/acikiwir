import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./dashboard";
import App from "./login";
import ProtectedRoute from "./guards/userguards";
import NotFound from "./notfound";

const routes = [
  { path: "/", element: <App></App> },
  { path: "/dashboard", element: <ProtectedRoute><Dashboard></Dashboard></ProtectedRoute> },
  { path: "*", element: <NotFound></NotFound> },
];

const router = createBrowserRouter(routes);
export default router;
