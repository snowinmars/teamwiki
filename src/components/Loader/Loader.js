import React, { PureComponent } from 'react';

import './Loader.scss';

class Loader extends PureComponent {
    render() {
        let loaderClass =
            'simr-flex simr-flex-align-center simr-flex-justify-center';

        if (this.props.hasErrors) {
            loaderClass += ' simr-loader-api-error ';
        }

        if (this.props.isHidden) {
            loaderClass += ' simr-loader hidden ';
        } else {
            loaderClass += ' simr-loader ';
        }

        return (
            <div className={loaderClass}>
                <div className="sk-folding-cube">
                    <div className="sk-cube1 sk-cube" />
                    <div className="sk-cube2 sk-cube" />
                    <div className="sk-cube4 sk-cube" />
                    <div className="sk-cube3 sk-cube" />
                </div>
            </div>
        );
    }
}

export default Loader;