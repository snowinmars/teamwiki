import React, { Component } from 'react';
import EnviromentTable from './../../components/EnviromentTable/EnviromentTable'
import Loader from './../../components/Loader/Loader'
import './Main.scss';

class Main extends Component {
    render() {
        return (
            <div>
                <Loader />
                <EnviromentTable />
            </div>
        );
    }
}

export default Main;