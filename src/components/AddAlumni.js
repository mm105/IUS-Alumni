import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//actions
import { addAlumni, clearStudents } from '../actions/students';

//city search
import Geocoder from 'react-mapbox-gl-geocoder';
import InputComponent from './CitySearch/InputComponent';
import ItemComponent from './CitySearch/ItemComponent';
import { useEffect } from 'react';
import Spinner from './Spinner';
import Navbar from './Navbar';

const AddAlumni = ({ addAlumni, clearStudents, loading }) => {
    useEffect(() => {
        return () => {
            clearStudents();
        };
    }, [clearStudents]);

    const [queryParams, setQueryParams] = useState({
        types: 'place',
        language: 'en',
    });

    const [citySelected, setCitySelected] = useState(false);

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

    const { name, surname, graduated, description } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSelectedCity = (viewport, item) => {
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
        setCitySelected(true);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (!citySelected) {
            alert('Please select a valid city!');
        } else {
            addAlumni(formData);

            //clear input fields
            setFormData({
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
        }
    };

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Navbar scrollActive={false} />
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
                                                Graduation Year
                                            </label>
                                            <input
                                                type="text"
                                                name="graduated"
                                                id="graduated"
                                                value={graduated}
                                                onChange={(e) => onChange(e)}
                                                placeholder="Year"
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
                                        <button type="submit">
                                            Add new alumni
                                        </button>
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

AddAlumni.propTypes = {
    addAlumni: PropTypes.func.isRequired,
    clearStudents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
});

const mapDispatchToProps = {
    addAlumni,
    clearStudents,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAlumni);
