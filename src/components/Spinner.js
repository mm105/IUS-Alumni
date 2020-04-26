import React, { Fragment, useEffect } from 'react';
import spinner from '../images/spinner.gif';

const Spinner = () => {
    useEffect(() => {
        const footer = document.querySelector('.footer');
        const content_wrap = document.querySelector('.content-wrap');
        // const page_container = document.querySelector('.page-container');
        footer.style.display = 'none';
        content_wrap.style.paddingBottom = '0';

        // page_container.style.minHeight = '0';
        return () => {
            footer.style.display = 'block';
            content_wrap.style.paddingBottom = '200px';
            // page_container.style.minHeight = '100vh';
        };
    }, []);
    return (
        <Fragment>
            <div className="fc spinner">
                <img src={spinner} alt="Loading..." />
                <h3>Animus Development</h3>
            </div>
        </Fragment>
    );
};

export default Spinner;
