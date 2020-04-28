import React, { Fragment, useEffect, useState } from 'react';

import { connect } from 'react-redux';

import map_img from '../images/img2.png';

//components
import AlumniList from './AlumniList';
import MapTest from './MapTest';
import Navbar from './Navbar';
import { getSearchResults } from '../actions/search';
import { loadAdmin } from '../actions/auth';
import Spinner from './Spinner';

const Landing = ({ isAuthenticated, getSearchResults, results, loading }) => {
    const nav = document.querySelector('nav');
    useEffect(() => {
        loadAdmin();
    }, [nav, isAuthenticated]);

    // useEffect(() => {
    //     setsearchResults(results);
    // }, [results]);

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

    // * SEARCH

    // //search value
    // const [search, setSearch] = useState('');
    // const [searchResults, setsearchResults] = useState({});

    // const onChangeSearch = (e) => {
    //     setSearch(e.target.value);
    //     if (e.target.value.length > 2) {
    //         getSearchResults(e.target.value);
    //     } else {
    //         setsearchResults({});
    //     }
    // };

    return (
        <Fragment>
            {loading ? (
                <Spinner small={false} />
            ) : (
                <Fragment>
                    <Navbar scrollActive={true} />
                    <header className="header">
                        <div className="wrapper">
                            <div className="square">
                                <div className="square bottom">
                                    <div className="heading">
                                        <h1>
                                            <span id="ius">IUS</span> Alumni
                                        </h1>
                                        <p>
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit. Quia
                                            vitae quidem eveniet facere
                                            accusantium, <br />
                                        </p>
                                        <p className="promo">
                                            Want to join (I)US? Check
                                            <a href="https://www.ius.edu.ba/">
                                                {' '}
                                                ius.edu.ba
                                            </a>
                                            !
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
                        <div className="search-wrap">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                // value={search}
                                placeholder="Not functional..."
                                autoComplete="off"
                                // onChange={(e) => {
                                //     onChangeSearch(e);
                                // }}
                            />
                            {/* <div className="results">
                        {searchResults.students &&
                            searchResults.students.map((student) => (
                                <Fragment key={student.studentId}>
                                    <div className="search-item">
                                        <h5>
                                            {student.name} {student.surname}
                                        </h5>
                                        <p>{student.location.title} </p>
                                    </div>
                                </Fragment>
                            ))}
                    </div> */}
                        </div>

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
                                Filters{' '}
                                <i className="fas fa-angle-down test"></i>
                            </p>
                        </div>
                        <div className="mapContainer">
                            {switchComp ? <MapTest /> : <AlumniList />}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    results: state.search.results,
});

const mapDispatchToProps = {
    getSearchResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
