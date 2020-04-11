import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//actions
import { getAllStudents, clearStudents } from '../actions/students';
import { Link } from 'react-router-dom';

const AlumniList = ({
    students: { students, loading },
    getAllStudents,
    clearStudents,
    isAuthenticated,
}) => {
    //
    useEffect(() => {
        getAllStudents();
        return () => {
            clearStudents();
        };
    }, []);

    return (
        <Fragment>
            {loading ? (
                <h5>Loading..</h5>
            ) : (
                <Fragment>
                    <div className="alumni-list">
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
                                                <Link
                                                    to={`/edit-alumni/${student.studentId}`}
                                                >
                                                    Edit
                                                </Link>
                                            ) : (
                                                ''
                                            )}
                                        </span>
                                    </h5>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

AlumniList.propTypes = {
    getAllStudents: PropTypes.func.isRequired,
    clearStudents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    students: state.students,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
    getAllStudents,
    clearStudents,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlumniList);
