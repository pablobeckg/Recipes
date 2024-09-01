import { Link } from "react-router-dom";
import "./LoginStatus.css";
import { useUserContext } from "../../context/UserContext";
import supabaseClient from "../../lib/supabaseClient";
import { useEffect } from "react";

const LoginStatus = () => {
  const userContext = useUserContext();
  const avatarUrl = userContext?.avatarUrl;
  const user = userContext?.user;
  const setAvatarUrl = userContext?.setAvatarUrl;
  console.log(avatarUrl);

  if (!userContext) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return;
  }

  useEffect(() => {
    if (!user || !setAvatarUrl) return; 
    const fetchUserProfile = async () => {
      const profileResponse = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileResponse.error) {
        console.error("Error getting profile", profileResponse.error.message);
      }

      if (profileResponse.data.avatar_url) {
        setAvatarUrl(profileResponse.data.avatar_url);
      }
    };
    fetchUserProfile();
  }, [user]);

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
    <div className="login-status">
      {user ? (
        <div className="login-status">
          <img
            src={avatarUrl ? avatarUrl : undefined}
            alt=""
            className="login-avatar"
          />
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
