import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fragment } from 'react';

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 && (
        <Fragment>
            <div className="alert-wrap fc">
                {alerts.map((alert) => (
                    <Fragment key={alert.id}>
                        <div
                            className={`alert-bottom bottom-${alert.alertType}`}
                        >
                            <div className={`alert-top top-${alert.alertType}`}>
                                <div>{alert.msg}</div>
                            </div>
                        </div>
                    </Fragment>
                ))}
            </div>
        </Fragment>
    );

// alert.msg

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
};

const mapSateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapSateToProps)(Alert);
