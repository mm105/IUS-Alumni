import React, { useState, useEffect, useRef, Fragment, Component } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const Map = () => {
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [settings.lng, settings.lat],
            zoom: settings.zoom
        });

        map.on('move', () => {
            setSettings({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }, []);

    const mapContainer = useRef();

    const [settings, setSettings] = useState({
        lng: 5,
        lat: 34,
        zoom: 2
    });

    return (
        <Fragment>
            <div className="wrapper">
                <div className="sidebarStyle">
                    <div>
                        Longitude: {settings.lng} | Latitude: {settings.lat} |
                        Zoom: {settings.zoom}
                    </div>
                </div>
                <div
                    ref={el => (mapContainer.current = el)}
                    className="mapContainer"
                />
            </div>
        </Fragment>
    );
};

export default Map;
