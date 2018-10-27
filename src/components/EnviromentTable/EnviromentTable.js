import React, { Component } from 'react';
import './EnviromentTable.scss';

import {Consts} from './../../lib/consts';
import HttpUtils from './../../lib/httpUtils';

const componentStatuses = {
    ok: 'ok',
    httpQueryFailed: 'httpQueryFailed',
    initializing: 'initializing',
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            status:  componentStatuses.initializing
        }
    }

    componentDidMount() {
        HttpUtils.fetchAndHandle({
            uri: Consts.azureApi.getBranchesEnviromentBinding,
            onSuccess: (data) => {
                this.setState({
                    status: componentStatuses.ok,
                    items: data,
                });
            },
            onError: (data) => {
                this.setState({
                    status: componentStatuses.httpQueryFailed,
                    items: [],
                });
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.status}
            </div>
        );
    }
}

export default App;
