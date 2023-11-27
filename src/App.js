import React, {useEffect} from 'react'
import './App.css'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from "./theme";
import Home from "./pages/home/Home";
import setupAndInitI18n, {changeLanguage, getLanguage} from "./i18n/i18nSetup";
import UpdateInscriptionForm from "./pages/inscription-form/update/UpdateInscriptionForm";
import {register} from 'swiper/element/bundle';
import {scrollTo} from "./pages/common/utils";
import {useTranslation} from "react-i18next";


function App() {
  setupAndInitI18n();
  register();


  useEffect(() => {
      if (window.location.hash) {
          scrollTo(window.location.hash.split('#')[1]);
      }
  }, []);

  const setLanguage = (lang) => {
      changeLanguage(lang);
  }

  return (
    <ThemeProvider theme={theme}>
      <Router basename="/">
        <Switch>
            <Route path="/:language" render={({match}) => {
                const language = match.params.language;
                if (['nl', 'fr'].includes(language)) {
                    setLanguage(language + '-BE');
                    return <Switch>
                        <Route path={"/"+language+"/home"} component={Home} />
                        <Route render={() => <Redirect to={"/"+language+"/home"} />} />
                    </Switch>
                } else {
                    const language = getLanguage().substring(0, 2);
                    return <Redirect to={'/' + language + "/home"}/>;
                }
            }} />

            <Route render={() => <Redirect to={'/' + getLanguage().substring(0, 2) + '/home'}/>} />

            {/*</Route>*/}
            {/*  <Route path="/nl/home" render={() => {*/}
            {/*      setLanguage('nl-BE');*/}
            {/*      return <Home />;*/}
            {/*  }} exact />*/}
            {/*<Route path="/nl" render={() => {*/}
            {/*    return <Redirect to="/nl/home"/>;*/}
            {/*}} />*/}

            {/*<Route path="/fr/home" render={() => {*/}
            {/*    setLanguage('fr-BE');*/}
            {/*    return <Home />;*/}
            {/*}} exact />*/}
            {/*<Route path="/fr" render={() => {*/}
            {/*    return <Redirect to="/fr/home"/>;*/}
            {/*}} />*/}

            {/*<Route path="/en/home" render={() => {*/}
            {/*    setLanguage('en-BE');*/}
            {/*    return <Home />;*/}
            {/*}} exact />*/}
            {/*<Route path="/en" render={() => {*/}
            {/*    return <Redirect to="/en/home"/>;*/}
            {/*}} />*/}

          {/*<Redirect path="/" exact to="home"/>*/}
          {/* <Route component={Error} />*/}
        </Switch>
      </Router>
    </ThemeProvider>
  )
    ;
}

export default App;

