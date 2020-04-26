import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changePassword } from '../actions/auth';

const ChangePassword = ({ changePassword, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        newPassword: '',
        newPasswordConfirm: '',
    });

    const { email, password, newPassword, newPasswordConfirm } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        changePassword(formData);
    };

    // //Redirect if not logged in
    // if (!isAuthenticated) {
    //     return <Redirect to="/login" />;
    // }

    return (
        <Fragment>
            <div className="square-one sq-one-chg">
                <div className="square-two">
                    <form
                        className="login-content"
                        onSubmit={(e) => onSubmit(e)}
                        autoComplete="off"
                    >
                        <h3>Change your password</h3>
                        <input
                            type="password"
                            placeholder="Old password"
                            name="password"
                            minLength="6"
                            value={password}
                            onChange={(e) => onChange(e)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="New password"
                            name="newPassword"
                            minLength="6"
                            value={newPassword}
                            onChange={(e) => onChange(e)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            name="newPasswordConfirm"
                            minLength="6"
                            value={newPasswordConfirm}
                            onChange={(e) => onChange(e)}
                            required
                        />

                        <button type="submit" className="submit-btn">
                            Change password
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

ChangePassword.propTypes = {
    isAuthenticated: PropTypes.object.isRequired,
    changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { changePassword })(ChangePassword);
