// import React, { useState, useEffect, Fragment } from 'react';
// import { connect } from 'react-redux';
// import MapGL, { Popup, Marker } from '@urbica/react-map-gl';
// import PropTypes from 'prop-types';

// // import 'mapbox-gl/dist/mapbox-gl.css';

// //actions
// import { getStudentsLocation, clearStudents } from '../actions/students';
// import { getStudentInfo, clearStudentInfo } from '../actions/studentInfo';
// import Spinner from './Spinner';

// const Map = ({
//     students: { studentsLoc, loading },
//     studentInfo: { studentInfo, infoLoading },
//     getStudentsLocation,
//     getStudentInfo,
//     clearStudentInfo,
//     clearStudents,
// }) => {
//     //
//     useEffect(() => {
//         getStudentsLocation();
//         return () => {
//             clearStudentInfo();
//             clearStudents();
//         };
//     }, [getStudentsLocation, clearStudentInfo, clearStudents]);

//     const [viewport, setViewport] = useState({
//         longitude: 1,
//         latitude: 1,
//         // width: '1200px',
//         // height: '600px',
//         zoom: 1,
//         minZoom: 1,
//     });

//     const [selectedStudent, setSelectedStudent] = useState(null);

//     return (
//         <Fragment>
//             {loading ? (
//                 <Spinner small={true} />
//             ) : (
//                 <Fragment>
//                     <MapGL
//                         style={{
//                             width: '1200px',
//                             height: '500px',
//                             boorderRadius: '20px',
//                         }}
//                         accessToken={process.env.REACT_APP_MAPBOX_KEY}
//                         mapStyle="mapbox://styles/mapbox/streets-v11"
//                         // onViewportChange={(viewport) => {
//                         //     setViewport(viewport);
//                         // }}
//                         onViewportChange={setViewport}
//                         latitude={viewport.latitude}
//                         longitude={viewport.longitude}
//                         zoom={viewport.zoom}
//                     >
//                         {studentsLoc.map((student) => (
//                             <Marker
//                                 key={student.studentId}
//                                 latitude={student.coordinates[0]}
//                                 longitude={student.coordinates[1]}
//                             >
//                                 <button
//                                     className="marker-btn"
//                                     onClick={(e) => {
//                                         e.preventDefault();
//                                         getStudentInfo(student.studentId);
//                                         setSelectedStudent(true);
//                                     }}
//                                 >
//                                     <i className="fas fa-map-marker-alt"></i>
//                                 </button>
//                             </Marker>
//                         ))}
//                         {!infoLoading && selectedStudent ? (
//                             <Popup
//                                 latitude={studentInfo.location.coordinates[0]}
//                                 longitude={studentInfo.location.coordinates[1]}
//                                 onClose={() => {
//                                     setSelectedStudent(null);
//                                     clearStudentInfo();
//                                 }}
//                                 className="popup"
//                                 closeOnClick={true}
//                             >
//                                 <div className="popup-inner">
//                                     <h4>
//                                         {studentInfo.name} {studentInfo.surname}{' '}
//                                     </h4>
//                                     <p>{studentInfo.location.title} </p>
//                                     <p>{studentInfo.description} </p>
//                                     <p>Graduated: {studentInfo.graduated} </p>
//                                 </div>
//                             </Popup>
//                         ) : null}
//                     </MapGL>
//                 </Fragment>
//             )}
//         </Fragment>
//     );
// };

// Map.propTypes = {
//     getStudentsLocation: PropTypes.func.isRequired,
//     getStudentInfo: PropTypes.func.isRequired,
//     clearStudentInfo: PropTypes.func.isRequired,
//     clearStudents: PropTypes.func.isRequired,
//     students: PropTypes.object.isRequired,
// };

// const maptStateToProps = (state) => ({
//     students: state.students,
//     studentInfo: state.studentInfo,
// });

// const mapDispatchToProps = {
//     getStudentsLocation,
//     getStudentInfo,
//     clearStudentInfo,
//     clearStudents,
// };

// export default connect(maptStateToProps, mapDispatchToProps)(Map);

// // import React, { useState, useEffect, useRef, Fragment, Component } from 'react';
// // import mapboxgl from 'mapbox-gl';

// // mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

// // const Map = () => {
// //     useEffect(() => {
// //         const map = new mapboxgl.Map({
// //             container: mapContainer.current,
// //             style: 'mapbox://styles/mapbox/streets-v11',
// //             center: [settings.lng, settings.lat],
// //             zoom: settings.zoom
// //         });

// //         map.on('move', () => {
// //             setSettings({
// //                 lng: map.getCenter().lng.toFixed(4),
// //                 lat: map.getCenter().lat.toFixed(4),
// //                 zoom: map.getZoom().toFixed(2)
// //             });
// //         });
// //     }, []);

// //     const mapContainer = useRef();

// //     const [settings, setSettings] = useState({
// //         lng: 5,
// //         lat: 34,
// //         zoom: 2
// //     });

// //     return (
// //         <Fragment>
// //             <div className="wrapper">
// //                 <div className="sidebarStyle">
// //                     <div>
// //                         Longitude: {settings.lng} | Latitude: {settings.lat} |
// //                         Zoom: {settings.zoom}
// //                     </div>
// //                 </div>
// //                 <div
// //                     ref={el => (mapContainer.current = el)}
// //                     className="mapContainer"
// //                 />
// //             </div>
// //         </Fragment>
// //     );
// // };

// // export default Map;
