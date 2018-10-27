import React, { Component } from 'react';
import './EnviromentTable.scss';
import Loader from './../../components/Loader/Loader'
import Pinger from './../../components/Pinger/Pinger'

import {componentStatuses, azureApi} from './../../lib/consts';
import HttpUtils from './../../lib/httpUtils';
import BootstrapTable from 'react-bootstrap-table-next';

class EnviromentTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            status: componentStatuses.initializing
        }
    }

    map = (data) => {
        return data.items.map((item) => ({
            key: item.enviroment,
            name: item.name,
            url: item.url,
            enviroment: item.enviroment,
            lastBuild: item.lastBuild,
            lastDeploy: item.lastDeploy,
            isFrozen: item.isFrozen,
        }));
    }

    componentDidMount() {
        HttpUtils.fetchAndHandle({
            uri: azureApi.getBranchesEnviromentBinding,
            method: 'GET',
            onSuccess: (data) => {
                this.setState({
                    status: componentStatuses.ok,
                    items: this.map(data),
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

    pingerFormatter = (item, row) => {
        return (
            <Pinger uri={row.url} interval={10000}/>
        );
    }

    render() {
        const columns =  [{
            dataField: 'pinger',
            text: ' ',
            formatter: this.pingerFormatter,
          }, {
            dataField: 'name',
            text: 'Name'
          }, {
            dataField: 'enviroment',
            text: 'Enviroment'
          }, {
            dataField: 'lastBuild',
            text: 'Builded At'
          }, {
            dataField: 'lastDeploy',
            text: 'Deployed At'
          }, {
            dataField: 'isFrozen',
            text: 'Is branch frozen?'
          }];

        return (
            <div>
                <Loader 
                    isHidden = { this.state.status === componentStatuses.ok }
                    hasErrors = { this.state.status === componentStatuses.httpQueryFailed }/>
                <BootstrapTable striped hover data = { this.state.items }
                columns = { columns }
                keyField = 'enviroment'/>
            </div>
        );
    }
}

export default EnviromentTable;
