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
    }, []);

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
    }, [infoLoading, studentInfo]);

    const [queryParams, setQueryParams] = useState({
        types: 'place',
        language: 'en',
    });

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        graduated: '6/2024',
        description: '',
        location: {
            title: '',
            coordinates: [],
            type: 'Point',
        },
    });

    const { name, surname, description, location } = formData;

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
    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }
    return (
        <Fragment>
            {infoLoading ? (
                <h5>Loading data...</h5>
            ) : (
                <Fragment>
                    <form
                        className="add-alumni-form"
                        onSubmit={(e) => onSubmitForm(e)}
                        autoComplete="off"
                    >
                        <div className="alumni-form-group">
                            <label htmlFor="">First name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => onChange(e)}
                                required
                            />
                            <label htmlFor="surname">Last name</label>
                            <input
                                type="text"
                                name="surname"
                                id="surname"
                                value={surname}
                                onChange={(e) => onChange(e)}
                                required
                            />
                        </div>
                        <div className="alumni-form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                cols="30"
                                rows="10"
                                value={description}
                                onChange={(e) => onChange(e)}
                                required
                            ></textarea>
                        </div>
                        <div className="alumni-form-group">
                            <label htmlFor="geocoder">City</label>
                            <Geocoder
                                mapboxApiAccessToken={
                                    process.env.REACT_APP_MAPBOX_KEY
                                }
                                inputComponent={InputComponent}
                                itemComponent={ItemComponent}
                                viewport={{}}
                                updateInputOnSelect={true}
                                onSelected={onSelectedCity}
                                queryParams={queryParams}
                                initialInputValue={location.title}
                                timeout={100}
                                limit={4}
                                id="gecoder"
                                required
                            />
                        </div>
                        <div className="image"></div>
                        <button type="submit">Edit alumni</button>
                    </form>
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
