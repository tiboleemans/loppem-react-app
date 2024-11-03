import React, {useEffect} from 'react'
import './App.css'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from "./theme";
import Home from "./pages/home/Home";
import setupAndInitI18n, {changeLanguage, getLanguage} from "./i18n/i18nSetup";
import {register} from 'swiper/element/bundle';
import {scrollTo} from "./pages/common/utils";
import Jobs from "./pages/jobs/Jobs";
import Berlaymont from "./pages/berlaymont/Berlaymont";
import Attestations from "./pages/attestation/Attestations";
import JobsConfirmationWrapper from "./pages/jobs/JobsConfirmationWrapper";


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
            if (['nl', 'fr', 'en'].includes(language)) {
              setLanguage(language);
              return <Switch>
                <Route path={"/" + language + "/home"} component={Home}/>
                <Route path={"/" + language + "/jobs/confirmation"} component={JobsConfirmationWrapper}/>
                <Route path={"/" + language + "/jobs"} component={Jobs}/>
                <Route path={"/" + language + "/berlaymont"} component={Berlaymont}/>
                <Route path={"/" + language + "/attestation"} component={Attestations}/>
                <Route render={() => <Redirect to={"/" + language + "/home"}/>}/>
              </Switch>
            } else {
              const language = getLanguage().substring(0, 2);
              return <Redirect to={'/' + language + "/home"}/>;
            }
          }}/>
          <Route render={() => <Redirect to={'/' + getLanguage().substring(0, 2) + '/home'}/>}/>

        </Switch>
      </Router>
    </ThemeProvider>
  )
    ;
}

export default App;

