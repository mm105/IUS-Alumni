import React, { Fragment } from 'react';
import MapTest from './MapTest';

const Landing = () => {
    return (
        <Fragment>
            <div className="landing-text">
                <h3>Explore IUS Alumni!</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur, tenetur ullam? Sint provident perferendis
                    officia.
                </p>
            </div>

            <div className="mapContainer">
                <MapTest />
            </div>
        </Fragment>
    );
};

export default Landing;
