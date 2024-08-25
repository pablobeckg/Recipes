import { useState } from 'react';
import './LoginPage.css';
import supabaseClient from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // * react-router-dom Funktion mit der ich einfach direkt im Code zu einer anderen Seite navigieren kann
  const navigate = useNavigate();

  const userContext = useUserContext();

  // ? alle supabase-Funktionen muss ich awaiten, deshalb hier async Funktion
  const handleLogin = async (e: React.FormEvent) => {
    // ? verhindert das Neuladen der Seite - das wäre das Standardverhalten des Formbuttons
    e.preventDefault();
    // ? immer wenn wir auf den Login-Button klicken, wollen wir dass erstmal die Messages verschwinden
    setErrorMessage(null);
    setSuccessMessage(null);
    // * hier kommt dann die Supabase Login-Logik rein
    // ? alle signin-Funktionen findet man unter .auth
    // ? wir nutzen signInWithPassword
    const authResponse = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    // ? immer zuerst schauen, ob in der Antwort von Supabase ein error drinsteckt, dann direkt aufhören
    if (authResponse.error) {
      console.error('Login error', authResponse.error.message);
      setErrorMessage(authResponse.error.message);
      return;
    }
    // ? wenn die Anmeldung geklappt hat, stecken die Info in .data
    // ? in .user steckt dann der erfolgreich angemeldete user
    if (authResponse.data?.user) {
      console.log('User erfolgreich angemeldet', authResponse.data.user);
      setSuccessMessage('Login successful.');
      // ? nach erfolgreichem Login schreiben wir den User in den globalen UserContext
      userContext?.setUser(authResponse.data.user);
      // ? ich kann navigate aufrufen und als Parameter den Pfad mitgeben
      // ? bei uns liegen die Quizzes direkt unter /
      // ? natürlich nur zu Pfaden, die es in der App.tsx als Route gibt
      // ? wir packen einen Timeout aussen rum, damit man 1 Sekunde lang die successMessage sieht
      setTimeout(() => navigate('/'), 1000);

      // navigate('/');
    }
  };
  // ? Passwort zurücksetzen Logik
  const handleResetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // ? ich kann direkt die resetPasswordForEmail Funktion von Supabase nutzen
    const resetResponse = await supabaseClient.auth.resetPasswordForEmail(email);

    // ? in error steckt die Errormessage, wenn das Zurücksetzen nicht geklappt hat.
    if (resetResponse.error) {
      console.error(resetResponse.error.message);
      setErrorMessage(resetResponse.error.message);
      return;
    }

    if (resetResponse.data) {
      setSuccessMessage('Password reset link has been sent to your email.');
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
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <div className="reset-password-container">
        <button className="additional-button" onClick={handleResetPassword}>
          Forgot your password?
        </button>
        <button className="additional-button" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
