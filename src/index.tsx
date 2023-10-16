import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

// const onRedirectCallback = (appState: any) => {
//   window.location.href =
//     appState && appState.returnTo ? appState.returnTo : window.location.href;
// };

ReactDOM.render(
  <React.StrictMode>
    {process.env.REACT_APP_AUTH0_DOMAIN &&
    process.env.REACT_APP_AUTH0_CLIENT_ID ? (
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        // onRedirectCallback={onRedirectCallback}
        cacheLocation="localstorage"
      >
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Auth0Provider>
    ) : (
      <App />
    )}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
