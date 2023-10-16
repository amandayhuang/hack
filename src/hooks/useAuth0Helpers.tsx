import { useAuth0 } from "@auth0/auth0-react";

export const useAuth0Helpers = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();

  const handleLogin = () => {
    // loginWithRedirect({
    //   appState: {
    //     returnTo: window.location.pathname,
    //   },
    // });
    loginWithRedirect();
  };

  const handleSignup = () => {
    loginWithRedirect({
      authorizationParams: { screen_hint: "signup" },
    });
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    handleLogin,
    handleSignup,
    handleLogout,
  };
};
