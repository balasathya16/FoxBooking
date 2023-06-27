import React from 'react';
import { useGoogleOAuth } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';

const SocialAuthButtons = () => {
  const { signIn, loaded } = useGoogleOAuth({
    clientId: '160214083248-lh01pgd4bct49jpp9kpklfdi9a7cvgdj.apps.googleusercontent.com',
    onSuccess: handleGoogleResponse,
    onFailure: handleGoogleResponse,
  });

  const handleGoogleResponse = (response) => {
    // Handle Google sign-up response
    console.log(response);
  };

  const handleFacebookResponse = (response) => {
    // Handle Facebook sign-up response
    console.log(response);
  };

  return (
    <div>
      <button onClick={signIn} disabled={!loaded}>
        Register with Google
      </button>

      <FacebookLogin
        appId="655125956044052"
        fields="name,email,picture"
        onSuccess={handleFacebookResponse}
        onFailure={handleFacebookResponse}
        textButton="Register with Facebook"
      />
    </div>
  );
};

export default SocialAuthButtons;
