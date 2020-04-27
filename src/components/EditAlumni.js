import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//actions
import { editAlumni, clearStudents } from '../actions/students';
import { getStudentInfo, clearStudentInfo } from '../actions/studentInfo';

//city search
import Geocoder from 'react-mapbox-gl-geocoder';
import InputComponent from './CitySearch/InputComponent';
import ItemComponent from './CitySearch/ItemComponent';
import { useEffect } from 'react';
import Spinner from './Spinner';

const EditAlumni = ({
    //props
    match,
    history,
    isAuthenticated,
    studentInfo: { studentInfo, infoLoading },
    //actions
    clearStudents,
    getStudentInfo,
    clearStudentInfo,
    editAlumni,
}) => {
    useEffect(() => {
        getStudentInfo(match.params.id);
        return () => {
            clearStudentInfo();
            clearStudents();
        };
    }, [getStudentInfo, clearStudentInfo, clearStudents, match.params.id]);

    useEffect(() => {
        setFormData({
            studentId: `${match.params.id}`,
            name: infoLoading ? '' : studentInfo.name,
            surname: infoLoading ? '' : studentInfo.surname,
            graduated: infoLoading ? '' : studentInfo.graduated,
            description: infoLoading ? '' : studentInfo.description,
            location: {
                title: infoLoading ? '' : studentInfo.location.title,
                coordinates: infoLoading
                    ? ''
                    : studentInfo.location.coordinates,
                type: infoLoading ? '' : studentInfo.location.type,
            },
        });
    }, [infoLoading, studentInfo, match.params.id]);

    const [queryParams, setQueryParams] = useState({
        types: 'place',
        language: 'en',
    });

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        graduated: '',
        description: '',
        location: {
            title: '',
            coordinates: [],
            type: 'Point',
        },
    });

    const { name, surname, description, graduated } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSelectedCity = (viewport, item) => {
        console.log(item);
        const city = item.place_name.substr(0, item.place_name.indexOf(','));
        const country = item.place_name.substr(
            item.place_name.lastIndexOf(',') + 1
        );
        item.place_name = city + ',' + country;
        setFormData({
            ...formData,
            location: {
                title: item.place_name,
                coordinates: [item.center[1], item.center[0]],
                type: 'Point',
            },
        });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        editAlumni(formData);
        history.push('/alumni-list');
    };

    //Redirect if not logged in
    // if (!isAuthenticated) {
    //     return <Redirect to="/login" />;
    // }
    return (
        <Fragment>
            {infoLoading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <div className="fc add-wrap">
                        <h1 className="add-heading">Add Alumni</h1>
                        <div className="container fr">
                            <div className="add-bottom fc">
                                <form
                                    className="add-top fc"
                                    onSubmit={(e) => onSubmitForm(e)}
                                    autoComplete="off"
                                >
                                    <div className="add-alumni-form">
                                        <div className="alumni-form-group">
                                            <label htmlFor="">First name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={name}
                                                onChange={(e) => onChange(e)}
                                                placeholder="Name"
                                                required
                                            />
                                            <label htmlFor="surname">
                                                Last name
                                            </label>
                                            <input
                                                type="text"
                                                name="surname"
                                                id="surname"
                                                value={surname}
                                                onChange={(e) => onChange(e)}
                                                placeholder="Last name"
                                                required
                                            />
                                        </div>
                                        <div className="alumni-form-group">
                                            <label htmlFor="description">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                id="description"
                                                cols="30"
                                                rows="5 "
                                                value={description}
                                                onChange={(e) => onChange(e)}
                                                placeholder="Description"
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="alumni-form-group">
                                            <label htmlFor="graduated">
                                                Graduate date
                                            </label>
                                            <input
                                                type="text"
                                                name="graduated"
                                                id="graduated"
                                                value={graduated}
                                                onChange={(e) => onChange(e)}
                                                placeholder="MM/YYYY"
                                                required
                                            />
                                            <label htmlFor="geocoder">
                                                City
                                            </label>
                                            <Geocoder
                                                mapboxApiAccessToken={
                                                    process.env
                                                        .REACT_APP_MAPBOX_KEY
                                                }
                                                inputComponent={InputComponent}
                                                itemComponent={ItemComponent}
                                                viewport={{}}
                                                updateInputOnSelect={true}
                                                onSelected={onSelectedCity}
                                                queryParams={queryParams}
                                                timeout={100}
                                                limit={4}
                                                id="gecoder"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="add-alumni-button">
                                        <button type="submit">Edit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

EditAlumni.propTypes = {
    isAuthenticated: PropTypes.bool,
    //actions
    editAlumni: PropTypes.func.isRequired,
    clearStudents: PropTypes.func.isRequired,
    getStudentInfo: PropTypes.func.isRequired,
    clearStudentInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    studentInfo: state.studentInfo,
});

const mapDispatchToProps = {
    editAlumni,
    clearStudents,
    getStudentInfo,
    clearStudentInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAlumni);
