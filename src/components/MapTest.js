import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import PropTypes from 'prop-types';
//actions
import { getStudentsLocation, clearStudents } from '../actions/students';
import { getStudentInfo, clearStudentInfo } from '../actions/studentInfo';
import Spinner from './Spinner';
const MapTest = ({
    students: { studentsLoc, loading },
    studentInfo: { studentInfo, infoLoading },
    getStudentsLocation,
    getStudentInfo,
    clearStudentInfo,
    clearStudents,
}) => {
    //
    useEffect(() => {
        getStudentsLocation();
        return () => {
            clearStudentInfo();
            clearStudents();
        };
    }, [getStudentsLocation, clearStudentInfo, clearStudents]);

    const [viewport, setViewport] = useState({
        latitude: 20,
        longitude: 10,
        width: '80vw',
        height: '80vh',
        zoom: 1.5,
        minZoom: 1.5,
    });

    const [selectedStudent, setSelectedStudent] = useState(null);

    return (
        <Fragment>
            {loading || studentsLoc === undefined ? (
                <Spinner small={true} />
            ) : (
                <Fragment>
                    <ReactMapGl
                        {...viewport}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        onViewportChange={(viewport) => {
                            setViewport(viewport);
                        }}
                        onResize={() => {
                            setViewport({
                                ...viewport,
                                width: '80vw',
                                height: '80vh',
                                // width: `${(2 * window.innerWidth) / 3}`,
                                // height: `${(2 * window.innerHeight) / 3}`,
                            });
                        }}
                    >
                        {studentsLoc.map((student) => (
                            <Marker
                                key={student.studentId}
                                latitude={student.coordinates[0]}
                                longitude={student.coordinates[1]}
                            >
                                <button
                                    className="marker-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        getStudentInfo(student.studentId);
                                        setSelectedStudent(true);
                                    }}
                                >
                                    <i className="fas fa-map-marker-alt"></i>
                                </button>
                            </Marker>
                        ))}
                        {!infoLoading && selectedStudent ? (
                            <Popup
                                latitude={studentInfo.location.coordinates[0]}
                                longitude={studentInfo.location.coordinates[1]}
                                onClose={() => {
                                    setSelectedStudent(null);
                                    clearStudentInfo();
                                }}

                                // closeOnClick={true}
                            >
                                <div>
                                    <h4 id="pop_name">
                                        {studentInfo.name} {studentInfo.surname}{' '}
                                    </h4>
                                    <p id="pop_loc">
                                        {studentInfo.location.title}{' '}
                                    </p>
                                    <p id="pop_des">
                                        {studentInfo.description}{' '}
                                    </p>
                                    <p id="pop_grad">
                                        Graduated: {studentInfo.graduated}{' '}
                                    </p>
                                </div>
                            </Popup>
                        ) : null}
                    </ReactMapGl>
                </Fragment>
            )}
        </Fragment>
    );
};

MapTest.propTypes = {
    getStudentsLocation: PropTypes.func.isRequired,
    getStudentInfo: PropTypes.func.isRequired,
    clearStudentInfo: PropTypes.func.isRequired,
    clearStudents: PropTypes.func.isRequired,
    students: PropTypes.object.isRequired,
};

const maptStateToProps = (state) => ({
    students: state.students,
    studentInfo: state.studentInfo,
});

const mapDispatchToProps = {
    getStudentsLocation,
    getStudentInfo,
    clearStudentInfo,
    clearStudents,
};

export default connect(maptStateToProps, mapDispatchToProps)(MapTest);
