import React, { Component } from 'react';
import './TasksTable.scss';
import Loader from './../../components/Loader/Loader'

import {componentStatuses, azureApi} from './../../lib/consts';
import HttpUtils from './../../lib/httpUtils';
import BootstrapTable from 'react-bootstrap-table-next';

class TasksTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            status: componentStatuses.initializing
        }
    }

    map = (data) => {
        return data.items.map((item) => ({
            key: item.id,
            id: item.id,
            status: item.status,
            assignee: item.assignee,
            loggedHours: item.loggedHours,
            relatedBranches: item.relatedBranches,
            relatedPullRequests: item.relatedPullRequests
        }));
    }

    componentDidMount() {
        HttpUtils.fetchAndHandle({
            uri: azureApi.tasksForUser,
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

    relatedPullRequestsFormatter = (cell, row) => {
        return (
            <div>
                { row.relatedPullRequests.map((item) => {
                    let frozenClass = ' tw-pull-request-is-frozen ';

                    if (item.isMerged === "false") {
                        frozenClass += ' hidden ';
                    }

                    let mergedClass = ' tw-pull-request-is-merged ';
                    if (item.destinationBranch.isFrozen === "false") {
                        mergedClass += ' hidden ';
                    }

                    return <div>
                        <span className='tw-pull-request-flags'>
                            <span className={frozenClass}>F</span>
                            <span className={mergedClass}>M</span>
                        </span>
                        <span>{item.id}</span>: <span>{item.sourceBranch}</span> -> <span>{item.destinationBranch.id}</span>
                    </div> 
                    })}
            </div>
        );
    }

    relatedBranchesFormatter = (cell, row) => {
        return (
            <div>
                { row.relatedBranches.map((item) => <div>{item}</div>) }
            </div>
        );
    }

    render() {
        const columns =  [{
            dataField: 'id',
            text: 'Id'
          }, {
            dataField: 'status',
            text: 'Status'
          }, {
            dataField: 'assignee',
            text: 'Assignee'
          }, {
            dataField: 'loggedHours',
            text: 'Logged hours'
          }, {
            dataField: 'rarelatedBranches',
            text: 'Related branches',
            formatter: this.relatedBranchesFormatter
          }, {
            dataField: 'relatedPullRequests',
            text: 'Related pull requests',
            formatter: this.relatedPullRequestsFormatter
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

export default TasksTable;
