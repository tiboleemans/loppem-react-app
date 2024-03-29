import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import * as serviceWorker from './serviceWorker';
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </QueryClientProvider>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();