import React, { Component } from 'react';
import './Pinger.scss';

import {componentStatuses, azureApi} from './../../lib/consts';
import HttpUtils from './../../lib/httpUtils';

class Pinger extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: componentStatuses.initializing,
            intervalId: null,
        }
    }

    componentDidMount() {
        if (this.state.intervalId) {
            return;
        }

        var intervalId = setInterval(() => {
            HttpUtils.ping({
                uri: this.props.uri,
                method: 'HEAD',
                onSuccess: (data) => {
                    
                    this.setState({status: componentStatuses.ok});
                },
                onError: (data) => {
                    this.setState({status: componentStatuses.httpQueryFailed});
                }
            });
        }, this.props.interval);

        this.setState({intervalId: intervalId});
    }

    render() {
        let c = ' tw-pinger ';
        
        if (this.state.status === componentStatuses.initializing) {
            c += ' tw-pinger-initializing ';
        }

        if (this.state.status === componentStatuses.httpQueryFailed) {
            c += ' tw-pinger-failed ';
        }

        if (this.state.status === componentStatuses.ok) {
            c += ' tw-pinger-successed ';
        }

        return (
            <div className={c}></div>
        );
    }
}

export default Pinger;