import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../actions/auth';
import { useEffect } from 'react';

const Navbar = ({ logout, isAuthenticated, scrollActive }) => {
    // console.log(location);

    useEffect(() => {
        if (isAuthenticated) {
            const nav = document.querySelector('nav');
            if (nav !== null) {
                if (scrollActive) {
                    nav.classList.remove('scrolling-active');
                    window.addEventListener('scroll', () => {
                        if (nav !== null) {
                            nav.classList.toggle(
                                'scrolling-active',
                                window.scrollY > 100
                            );
                        }
                    });

                    return () => {
                        window.removeEventListener('scroll', () => {});
                    };
                } else {
                    nav.classList.add('scrolling-active');
                }
            }
        }
    }, [isAuthenticated, scrollActive]);
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
