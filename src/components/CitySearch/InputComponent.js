import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

const InputComponent = (props) => {
    //
    // useEffect(() => {
    //     setvalue(valueOfcity);
    // }, [valueOfcity]);

    // const [value, setvalue] = useState(' ');

    return (
        <Fragment>
            <input
                {...props}
                type="text"
                name=""
                id=""
                value={props.value === null ? '' : props.value}
            />
        </Fragment>
    );
};

// InputComponent.propTypes = {
//     valueOfcity: PropTypes.string.isRequired,
// };

// const mapStateToProps = (state) => ({
//     valueOfcity: state.addAlumni.valueOfCity,
// });

export default InputComponent;
