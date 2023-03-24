import React, { useState, useEffect } from 'react';

function GoogleLogin() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.gapi.load("auth2", () => {
        window.gapi.auth2
          .init({
            client_id: "YOUR_GOOGLE_CLIENT_ID",
            scope: "email profile openid",
          })
          .then(() => {
            const authInstance = window.gapi.auth2.getAuthInstance();
            setIsSignedIn(authInstance.isSignedIn.get());
            authInstance.isSignedIn.listen(setIsSignedIn);
          })
          .catch((err) => {
            console.log("Google Auth Error:", err);
          });
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSignInClick = () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signIn();
  };

  const handleSignOutClick = () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signOut();
  };

  return (
    <div>
      {isSignedIn ? (
        <div>
          <p>You are signed in!</p>
          <button onClick={handleSignOutClick}>Sign out</button>
        </div>
      ) : (
        <div>
          <p>You are not signed in.</p>
          <button onClick={handleSignInClick}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
}

export default GoogleLogin;