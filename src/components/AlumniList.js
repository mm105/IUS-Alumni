import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
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
    }, [getAllStudents]);

    return (
        <Fragment>
            {loading ? (
                <h5>Loading..</h5>
            ) : (
                <Fragment>
                    <div className="list-wrap ">
                        <h1 className="add-heading">Alumni List</h1>
                        <div className="alumni-list fc">
                            <div className="alumni-list-item">
                                <h5 id="first-row">
                                    Alumni <span>Graduated date</span>
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
});

const mapDispatchToProps = {
    getAllStudents,
    clearStudents,
    deleteStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlumniList);
