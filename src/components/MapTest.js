import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import PropTypes from 'prop-types';
//actions
import { getStudentsLocation, clearStudents } from '../actions/students';
import { getStudentInfo, clearStudentInfo } from '../actions/studentInfo';
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
    }, []);

    const [viewport, setViewport] = useState({
        lng: 1,
        lat: 1,
        width: '1000px',
        height: '500px',
        zoom: 1,
        minZoom: 1,
    });

    const [selectedStudent, setSelectedStudent] = useState(null);

    return (
        <div>
            <ReactMapGl
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={(viewport) => {
                    // const { width, height, ...etc } = viewport;
                    setViewport(viewport);
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
                        className="popup"
                    >
                        <div>
                            <h4>
                                {studentInfo.name} {studentInfo.surname}{' '}
                            </h4>
                            <p>City/Country: {studentInfo.location.title} </p>
                            <p>{studentInfo.description} </p>
                            <p>Graduated: {studentInfo.graduated} </p>
                        </div>
                    </Popup>
                ) : null}
            </ReactMapGl>
        </div>
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
