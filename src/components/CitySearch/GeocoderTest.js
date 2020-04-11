import React, { Fragment, useState } from 'react';
import Geocoder from 'react-mapbox-gl-geocoder';

import InputComponent from './InputComponent';
import ItemComponent from './ItemComponent';

const GeocoderTest = () => {
    const [queryParams, setQueryParams] = useState({
        types: 'place',
        language: 'en',
    });

    const onSelected = (viewport, item) => {
        const city = item.place_name.substr(0, item.place_name.indexOf(','));
        const country = item.place_name.substr(
            item.place_name.lastIndexOf(',') + 1
        );
        item.place_name = city + ',' + country;
    };
    return (
        <Fragment>
            <Geocoder
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                inputComponent={InputComponent}
                itemComponent={ItemComponent}
                viewport={{}}
                updateInputOnSelect={true}
                onSelected={onSelected}
                queryParams={queryParams}
                initialInputValue={' '}
                timeout={100}
                limit={4}
            />
        </Fragment>
    );
};

export default GeocoderTest;
