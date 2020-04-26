import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';
import { useEffect } from 'react';

const Login = ({ auth, login }) => {
    useEffect(() => {
        document.querySelector('.content-wrap').style.paddingBottom = '0px';
        return () => {
            document.querySelector('.content-wrap').style.paddingBottom =
                '200px';
        };
    }, []);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        login(email, password);
    };

    //Redirect if logged in
    if (auth.isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <Fragment>
            <div className="container-login">
                <div className="square-one">
                    <div className="square-two">
                        <form
                            onSubmit={(e) => onSubmit(e)}
                            className="login-content"
                        >
                            <h3>Please enter your credentials!</h3>
                            <input
                                type="email"
                                placeholder="email"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="password"
                                name="password"
                                minLength="6"
                                value={password}
                                onChange={(e) => onChange(e)}
                            />
                            <input
                                type="submit"
                                value="Login"
                                className="submit-btn"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

const mapDispatchToProps = {
    login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
