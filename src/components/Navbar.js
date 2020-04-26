import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../actions/auth';
import { useEffect } from 'react';

const Navbar = ({ logout, isAuthenticated, location }) => {
    // console.log(location);

    useEffect(() => {
        if (isAuthenticated) {
            //* CHANGING NAVBAR STYLE
            const nav = document.querySelector('nav');
            if (location.pathname !== '/' && nav !== null) {
                nav.classList.add('scrolling-active');
                // console.log('add in 1');
            } else {
                nav.classList.remove('scrolling-active');
                // console.log('remove in 1');
            }

            window.addEventListener('scroll', () => {
                if (nav !== null) {
                    if (location.pathname === '/' && window.scrollY > 100) {
                        nav.classList.add('scrolling-active');
                        // console.log('add in 2');
                    } else if (
                        location.pathname === '/' &&
                        window.scrollY <= 100
                    ) {
                        nav.classList.remove('scrolling-active');
                        // console.log('remove in 2');
                    }
                }
            });
        }
    }, [isAuthenticated, location.pathname]);
    return (
        <Fragment>
            {isAuthenticated ? (
                <Fragment>
                    <nav className="main-nav fr">
                        <ul className="main-menu">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/alumni-list">Alumni List</Link>
                            </li>
                            <li>
                                <Link to="/add-alumni">Add alumni</Link>
                            </li>
                            <li>
                                <Link to="/settings">Settings</Link>
                            </li>
                            <li>
                                <Link to="" onClick={logout}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </Fragment>
            ) : null}
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
