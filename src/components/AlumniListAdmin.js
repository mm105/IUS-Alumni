import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import { connect } from 'react-redux';

//actions
import { Link } from 'react-router-dom';
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
                <Spinner />
            ) : (
                <Fragment>
                    <div className="list-wrap ">
                        <h1 className="add-heading">Alumni List</h1>
                        <AlumniList />
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

AlumniListAdmin.propTypes = {};

const mapStateToProps = (state) => ({
    students: state.students,
});

const mapDispatchToProps = { getAllStudents, clearStudents };

export default connect(mapStateToProps, mapDispatchToProps)(AlumniListAdmin);
