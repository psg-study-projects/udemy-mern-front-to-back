import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {

    // use Effect hook %TODO %STUDYME
    useEffect(() => {
        // ~~ componentDidMount()
        store.dispatch(loadUser());
    }, []); // 2nd paramter with empty brackets prevents this from running continuously (ie doesnt'depend on anything from props or state)

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path='/' component={Landing} />
                    <section className="container">
                        <Alert />
                        <Switch>
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/login' component={Login} />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
)};

export default App;

// %TODO: study
// ~ "Hooks"
// ~ Fragment
// ~ Route, exact path
// ~ BrowserRouter
//
//
//
