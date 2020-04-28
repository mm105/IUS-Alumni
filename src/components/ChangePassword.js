import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changePassword } from '../actions/auth';

const ChangePassword = ({ changePassword }) => {
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        newPasswordConfirm: '',
    });

    const { password, newPassword, newPasswordConfirm } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        changePassword(formData);

        setFormData({
            password: '',
            newPassword: '',
            newPasswordConfirm: '',
        });
    };

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
    changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { changePassword })(ChangePassword);
