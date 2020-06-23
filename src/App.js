import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Registrasi from "./pages/registrasi";
import Login from "./pages/login";
import LupaPassword from "./pages/lupa-password";
import Landing from "./pages/landing";
import NotFound from "./pages/404";
import Private from "./pages/private";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/home";

import FirebaseProvider from "./components/FirebaseProvider";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./config/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <FirebaseProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/registrasi" component={Registrasi} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/lupa-password" component={LupaPassword} />
            <PrivateRoute path="/chat" component={Private} />
            <PrivateRoute path="/pengaturan" component={Private} />

            <Route component={NotFound} />
          </Switch>
        </Router>
      </FirebaseProvider>
    </ThemeProvider>
  );
}
