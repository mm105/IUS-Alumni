import React, { Fragment, useEffect, useState } from 'react';
import MapTest from './MapTest';
import { connect } from 'react-redux';

import map_img from '../images/img2.png';
import AlumniList from './AlumniList';

const Landing = ({ isAuthenticated }) => {
    const nav = document.querySelector('nav');
    useEffect(() => {
        // console.log(nav);
        if (isAuthenticated) {
            //* CHANGING NAVBAR STYLE

            // nav.classList.remove('scrolling-active');
            window.addEventListener('scroll', () => {
                if (nav !== null) {
                    nav.classList.toggle(
                        'scrolling-active',
                        window.scrollY > 100
                    );
                }
            });
        }
        return () => {
            window.removeEventListener('scroll', () => {});
        };
    }, [nav, isAuthenticated]);

    const [switchComp, setSwitchComp] = useState(true);
    const [btnColor, setbtnColor] = useState({
        mapClr: 'swtch-clicked',
        listClr: '',
    });
    const { mapClr, listClr } = btnColor;

    const onClickMap = () => {
        setSwitchComp(true);
        setbtnColor({
            mapClr: 'swtch-clicked',
            listClr: '',
        });
    };

    const onClickList = () => {
        setSwitchComp(false);
        setbtnColor({
            mapClr: '',
            listClr: 'swtch-clicked',
        });
    };

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
                                    <a href="/ius.edu.ba"> ius.edu.ba</a>!
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
                        Show:{' '}
                        <button
                            className={`lndg-swtch-btn ${mapClr}`}
                            onClick={() => {
                                onClickMap();
                            }}
                        >
                            Map
                        </button>{' '}
                        |{' '}
                        <button
                            className={`lndg-swtch-btn ${listClr}`}
                            onClick={() => {
                                onClickList();
                            }}
                        >
                            List
                        </button>
                    </p>
                    <p>
                        Filters <i className="fas fa-angle-down test"></i>
                    </p>
                </div>
                <div className="mapContainer">
                    {switchComp ? <MapTest /> : <AlumniList />}
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
