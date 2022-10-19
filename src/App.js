import React from 'react'
import './App.css'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import {MuiThemeProvider} from "@material-ui/core/styles";
import Scrollbar from "react-perfect-scrollbar";
import {Theme} from "./theme";
import GlobalCss from "./styles/jss/GlobalCss";
import Home from "./pages/Home";
import InscriptionForm from "./pages/Inscriptions/InscripionForm";
import setupAndInitI18n from "./i18n/i18nSetup";

function App() {
  setupAndInitI18n();
  return (
    <MuiThemeProvider theme={Theme}>
      <GlobalCss>
        <Scrollbar
          className="h-full-screen scrollable-content"
          options={{suppressScrollX: true}}
        >
          <Router basename="/">
            <Switch>
              <Route path="/home" component={Home} exact/>
              <Route path="/inscription/:id" component={InscriptionForm}/>
              <Redirect path="/" exact to="home"/>
              {/* <Route component={Error} /> */}
            </Switch>
          </Router>
        </Scrollbar>
      </GlobalCss>
    </MuiThemeProvider>
  );
}

export default App;

