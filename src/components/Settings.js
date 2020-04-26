import React, { Fragment } from 'react';
import ChangePassword from './ChangePassword';

const Settings = () => {
    return (
        <Fragment>
            <div className="settings-wrap">
                <h1 className="add-heading">Settings</h1>
                <div className="settings fc">
                    <ChangePassword />
                </div>
            </div>
        </Fragment>
    );
};

export default Settings;
