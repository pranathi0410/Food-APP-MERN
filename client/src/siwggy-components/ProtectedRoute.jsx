import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        textAlign: "center"
      }}>
        <h2>🔒 Access Restricted</h2>
        <p>You need to login to view this page.</p>

        <Link
          to="/login"
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#ff4d4f",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px"
          }}
        >
          Login Here
        </Link>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;