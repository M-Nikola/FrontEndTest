import React from 'react';
import './App.css';
import Form from './components/FormContainer';
import Table from './components/TableContainer';
import { strings } from './utilities/constants';

const App = () => (
    <div className='App'>
        <header className='App-header'>
            <h1>{strings.header}</h1>
        </header>

        <div className='Container'>
            <Form />
            
            <Table />
        </div>
    </div>
)

export default App;
