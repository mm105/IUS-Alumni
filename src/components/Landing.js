import React, { Fragment } from 'react';
import MapTest from './MapTest';

import map_img from '../images/img2.png';

const Landing = () => {
    return (
        <Fragment>
            <header className="header">
                <div className="wrapper">
                    <div className="square">
                        <div className="square bottom">
                            <div className="heading">
                                <h1>
                                    <span id="ius">IUS</span> Alumni
                                </h1>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Quia vitae quidem eveniet
                                    facere accusantium, <br />
                                </p>
                                <p className="promo">
                                    Want to join (I)US? Check
                                    <a href="/ius.edu.ba">ius.edu.ba</a>!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="image">
                        <img src={map_img} alt="" />
                    </div>
                </div>
            </header>
            <div className="transition"></div>
            <div className="main-section">
                <h2 className="search-heading">Search for alumni!</h2>

                <input
                    type="text"
                    name=""
                    id="search"
                    placeholder="Search..."
                    autoComplete="off"
                />
                <div className="options">
                    <p>
                        Show: <span>Map</span> | List
                    </p>
                    <p>
                        Filters <i className="fas fa-angle-down test"></i>
                    </p>
                </div>
                <div className="mapContainer">
                    <MapTest />
                </div>
            </div>
        </Fragment>
    );
};

export default Landing;
