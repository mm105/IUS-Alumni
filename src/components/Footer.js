import React from 'react';
import { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

const Footer = ({ location }) => {
    return (
        <Fragment>
            {location.pathname !== '/login' ? (
                <Fragment>
                    <div className="footer">
                        <div className="transition-to-footer"></div>
                        <div className="footer-main">
                            <a href="https://animusdev.com">
                                Animus Development 2020
                            </a>
                        </div>
                    </div>
                </Fragment>
            ) : null}
        </Fragment>
    );
};

export default withRouter(Footer);
