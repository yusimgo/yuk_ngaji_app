import React from "react";

import { Route, Redirect } from "react-router-dom";

import { useFirebase } from "./FirebaseProvider";

export default function PrivateRoute({ component: Component, ...resProps }) {
  const {user} = useFirebase();

  
  return (
    <Route
      {...resProps}
      render={props => {
        return user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        );
      }}
    />
  );
}
