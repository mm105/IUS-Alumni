import React, { Fragment } from 'react';

const ItemComponent = (props) => {
    const city = props.children.substr(0, props.children.indexOf(','));
    const country = props.children.substr(props.children.lastIndexOf(',') + 1);

    return (
        <Fragment>
            <div {...props}>
                <h5>{city}</h5>
                <p>{country}</p>
            </div>
        </Fragment>
    );
};

export default ItemComponent;
