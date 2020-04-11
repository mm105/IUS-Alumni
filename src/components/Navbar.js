import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';

const Navbar = ({ logout }) => {
    return (
        <Fragment>
            <div className="navbar">
                <Link to="/">Homepage</Link>
                <Link to="/alumni-list">Alumni list</Link>
                <Link to="/add-alumni">Add Alumni</Link>
                <Link to="#" onClick={logout}>
                    Logout
                </Link>
                <Link to="/change-pass">Change password</Link>
            </div>
        </Fragment>
    );
};

export default connect(null, { logout })(Navbar);
