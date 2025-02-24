import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) =>
            !isAuthenticated && !loading ? (
                <Redirect to="/" />
            ) : (
                <Component {...props} />
            )
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapSateteToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapSateteToProps)(PrivateRoute);
