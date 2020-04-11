import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

//redux
import { Provider } from 'react-redux';
import store from './store';

//Components
import PrivateRoute from './util/PrivateRoute';
import Landing from './components/Landing';
import Footer from './components/Footer';
import AddAlumni from './components/AddAlumni';
import EditAlumni from './components/EditAlumni';
import Navbar from './components/Navbar';
import Login from './components/Login';
import ChangePassword from './components/ChangePassword';
import AlumniList from './components/AlumniList';

//axios
axios.defaults.baseURL =
    'https://europe-west1-alumniius.cloudfunctions.net/api';
//set token to headers
if (localStorage.token) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.token;
} else {
    delete axios.defaults.headers.common['Authorization'];
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <header className="header">
                        <h1>IUS Alumni Map</h1>
                    </header>

                    <div className="container">
                        <Navbar />
                        <Switch>
                            <Route exact path="/" component={Landing} />
                            <Route
                                exact
                                path="/add-alumni"
                                component={AddAlumni}
                            />
                            <Route
                                exact
                                path="/edit-alumni/:id"
                                component={EditAlumni}
                            />
                            <Route
                                exact
                                path="/alumni-list"
                                component={AlumniList}
                            />
                            <Route exact path="/login" component={Login} />
                            <PrivateRoute
                                exact
                                path="/change-pass"
                                component={ChangePassword}
                            />
                        </Switch>
                    </div>

                    <Footer />
                </Fragment>
            </Router>
        </Provider>
    );
}

export default App;
