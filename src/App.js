import React from 'react'
import './App.css'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import {ThemeProvider} from '@mui/material/styles';
import {Theme} from "./theme";
import Home from "./pages/Home";
import setupAndInitI18n from "./i18n/i18nSetup";
import UpdateInscriptionForm from "./pages/Inscriptions/UpdateInscriptionForm";
import {GlobalStyleVariables} from "./styles/jss/utilities/global";

function App() {
  setupAndInitI18n();

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyleVariables>
        {/*<Scrollbar*/}
        {/*  className="h-full-screen scrollable-content"*/}
        {/*  options={{suppressScrollX: true}}*/}
        {/*>*/}
        <Router basename="/">
          <Switch>
            <Route path="/home" component={Home} exact/>
            <Route path="/inscription/:id" component={UpdateInscriptionForm}/>
            <Redirect path="/" exact to="home"/>
            {/* <Route component={Error} /> */}
          </Switch>
        </Router>
        {/*</Scrollbar>*/}
      </GlobalStyleVariables>
    </ThemeProvider>
  )
    ;
}

export default App;

