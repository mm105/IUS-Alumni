import React, { Fragment, useEffect } from 'react';
import spinner from '../images/spinner.gif';

const Spinner = ({ small }) => {
    const footer = document.querySelector('.footer');
    const content_wrap = document.querySelector('.content-wrap');
    const nav = document.querySelector('nav');

    useEffect(() => {
        if (!small) {
            if (nav !== null) {
                nav.classList.add('hide-nav');
                console.log('hh');
            }

            if (footer !== null) {
                footer.style.display = 'none';
            }

            if (content_wrap !== null) {
                content_wrap.style.paddingBottom = '0';
            }

            return () => {
                if (nav !== null) {
                    nav.classList.remove('hide-nav');
                }

                if (footer !== null) {
                    footer.style.display = 'block';
                }

                if (content_wrap !== null) {
                    content_wrap.style.paddingBottom = '200px';
                }
            };
        }
    }, [footer, content_wrap, nav]);
    return (
        <Fragment>
            <div className={small ? 'fc spinner small' : 'fc spinner'}>
                <img src={spinner} alt="Loading..." />
                {!small ? <h3>Animus Development</h3> : null}
            </div>
        </Fragment>
    );
};

export default Spinner;
