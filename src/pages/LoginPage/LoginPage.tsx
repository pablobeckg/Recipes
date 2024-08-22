import { useState } from "react";
import "./LoginPage.css"
import { useNavigate } from "react-router-dom";
import supabaseClient from "../../lib/supabaseClient";
import { useUserContext } from "../../context/UserContext";

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    const userContext = useUserContext(); 

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage(null);
      setSuccessMessage(null);
      const authResponse = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
  
      if (authResponse.error) {
        console.error("Login error", authResponse.error.message);
        setErrorMessage(authResponse.error.message);
        return;
      }
      if (authResponse.data?.user) {
        console.log("User erfolgreich angemeldet", authResponse.data.user);
        setSuccessMessage("Login successful");
  
        userContext?.setUser(authResponse.data.user)
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    };
  
    const handlePasswordReset = async (e: React.MouseEvent) => {
      e.preventDefault();
      setErrorMessage(null);
      setSuccessMessage(null);
  
      const resetResponse = await supabaseClient.auth.resetPasswordForEmail(
        email
      );
  
      if (resetResponse.error) {
        console.error(resetResponse.error.message);
        setErrorMessage(resetResponse.error.message);
        return;
      }
      if (resetResponse.data) {
        setSuccessMessage("Password reset link has been sent to your email");
      }
    };

    return (
        <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login to your account</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            id="email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            id="password"
            required
          />
          
          <button type="submit">Login</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
        <div className="reset-password-container">
          <button className="reset-password-bitton" onClick={handlePasswordReset}>
            Forgot your Password?
          </button>
        </div>
      </div>
    );
}
 
export default LoginPage;