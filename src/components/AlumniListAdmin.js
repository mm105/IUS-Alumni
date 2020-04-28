import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import { connect } from 'react-redux';

import Navbar from './Navbar';
//actions

import AlumniList from './AlumniList';
import { getAllStudents, clearStudents } from '../actions/students';

const AlumniListAdmin = ({
    students: { loading },
    getAllStudents,
    clearStudents,
}) => {
    useEffect(() => {
        getAllStudents();
        return () => {
            clearStudents();
        };
    }, [getAllStudents, clearStudents]);
    return (
        <Fragment>
            {loading ? (
                <Spinner small={false} />
            ) : (
                <Fragment>
                    <Navbar scrollActive={false} />
                    <div className="list-wrap ">
                        <h1 className="add-heading">Alumni List</h1>
                        <AlumniList />
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

AlumniListAdmin.propTypes = {
    students: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    students: state.students,
});

const mapDispatchToProps = { getAllStudents, clearStudents };

export default connect(mapStateToProps, mapDispatchToProps)(AlumniListAdmin);
