import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChangePassword from './ChangePassword';
import Spinner from './Spinner';

const Settings = ({ loading }) => {
    return (
        <Fragment>
            {loading ? (
                <Spinner small={false} />
            ) : (
                <Fragment>
                    <div className="settings-wrap">
                        <h1 className="add-heading">Settings</h1>
                        <div className="settings fc">
                            <ChangePassword />
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Settings.propTypes = {
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
