import React, { Component } from 'react';
import EnviromentTable from './../../components/EnviromentTable/EnviromentTable'
import TasksTable from './../../components/TasksTable/TasksTable'
import './Main.scss';

class Main extends Component {
    render() {
        return (
            <div>
                <TasksTable />
                <EnviromentTable />
            </div>
        );
    }
}

export default Main;