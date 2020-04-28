import React, { Fragment } from 'react';

const InputComponent = (props) => {
    return (
        <Fragment>
            <input
                {...props}
                type="text"
                name=""
                id="inputCity"
                placeholder="City"
                value={props.value === null ? '' : props.value}
            />
        </Fragment>
    );
};

export default InputComponent;
