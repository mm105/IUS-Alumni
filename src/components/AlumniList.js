import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import { connect } from 'react-redux';

//actions
import {
    getAllStudents,
    clearStudents,
    deleteStudent,
} from '../actions/students';
import { Link } from 'react-router-dom';

const AlumniList = ({
    students: { students, loading },
    auth,
    getAllStudents,
    clearStudents,
    isAuthenticated,
    deleteStudent,
}) => {
    //
    useEffect(() => {
        getAllStudents();
        return () => {
            clearStudents();
        };
    }, [getAllStudents, clearStudents]);

    return (
        <Fragment>
            {loading || students === undefined || auth.loading ? (
                <Spinner small={true} />
            ) : (
                <Fragment>
                    <div className="alumni-list fc">
                        <div className="border-bottom">
                            <div className="border-top">
                                <div className="alumni-list-item">
                                    <h5 id="first-row">
                                        Alumni{' '}
                                        <span
                                            id={
                                                isAuthenticated
                                                    ? 'graduated-mrg'
                                                    : ''
                                            }
                                        >
                                            Graduation Year
                                        </span>
                                    </h5>
                                </div>
                                {students.map((student) => (
                                    <Fragment key={student.studentId}>
                                        <div className="alumni-list-item">
                                            <h5>
                                                {student.name} {student.surname}
                                                <span>
                                                    {student.graduated}{' '}
                                                    {isAuthenticated ? (
                                                        <Fragment>
                                                            <Link
                                                                to={`/edit-alumni/${student.studentId}`}
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => {
                                                                    deleteStudent(
                                                                        student.studentId
                                                                    );
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </Fragment>
                                                    ) : (
                                                        ''
                                                    )}
                                                </span>
                                            </h5>
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

AlumniList.propTypes = {
    getAllStudents: PropTypes.func.isRequired,
    clearStudents: PropTypes.func.isRequired,
    deleteStudent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    students: state.students,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});

const mapDispatchToProps = {
    getAllStudents,
    clearStudents,
    deleteStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlumniList);
