import { Link } from "react-router-dom";
import "./LoginStatus.css";
import { useUserContext } from "../../context/UserContext";
import supabaseClient from "../../lib/supabaseClient";

const LoginStatus = () => {
  const userContext = useUserContext();
  const avatarUrl = userContext?.avatarUrl
  const user = userContext?.user;

  const handleLogoutClicked = async (e: React.MouseEvent) => {
    e.preventDefault();

    const signoutResponse = await supabaseClient.auth.signOut();

    if (signoutResponse.error) {
      console.error("Logout error", signoutResponse.error);
    } else {
      userContext?.setUser(null);
    }
  };

  return (
    <div >
      {user ? (
        
        <div className="login-status">
          <img src={avatarUrl ? avatarUrl : undefined} alt=""  className="login-avatar"/>
          <span>Welcome, </span>
          <span>
            <Link to="/profile">{user.email}</Link>
          </span>
          <button className="logout-button" onClick={handleLogoutClicked}>
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login">
          <button>Login </button>
        </Link>
      )}
    </div>
  );
};

export default LoginStatus;
