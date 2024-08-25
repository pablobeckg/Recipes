import { Link } from "react-router-dom";
import "./LoginStatus.css";
import { useUserContext } from "../../context/UserContext";
import supabaseClient from "../../lib/supabaseClient";

const LoginStatus = () => {
  const userContext = useUserContext();
  const user = userContext?.user;

  const handleLogoutClicked = async (e: React.MouseEvent) => {
    e.preventDefault();

    const signoutResponse = await supabaseClient.auth.signOut();

    if (signoutResponse.error) {
        console.error('Logout error', signoutResponse.error)
    }else {
        userContext?.setUser(null);
    }
  }

  return (
    <div className="login-status">
      {user ? (
        <div>
           <span>Welcome, </span>
          <span>
            <Link to="/profile">{user.email}</Link>
          </span>
          <button className="logout-button" onClick={(handleLogoutClicked)}>Logout</button>
        </div>
      ) : (
        <button>
          <Link to="/login">Login</Link>
        </button>
      )}
    </div>
  );
};

export default LoginStatus;
