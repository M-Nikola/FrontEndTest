import React, { Component, Fragment } from 'react';
import styles from './styles.module.css';

import { connect } from 'react-redux';

import ErrorMessage from '../ErrorMessage';

class TableContainer extends Component {

    renderTableData = columns => columns.map(column => {
        const rows = Object.values(column);
        const key = rows[0];
        return (
            <tr key={key}>
                {rows.map(row => (
                    <td key={`${key} - ${row}`}>
                        {row}
                    </td>
                ))}
            </tr>
        )
    });

    renderTableHeader = column => {
        const rows = Object.keys(column);
        return (
            <tr>
                {rows.map(row => (
                    <th key={row}>
                        {row.toUpperCase()}
                    </th>
                ))}
            </tr>
        )
    }

    render() {
        const { cities, error } = this.props.Cities;
        return (
            <Fragment>
                {cities && cities.length > 0 &&
                    <table className={styles.tableContainer}>
                        <tbody>
                            {this.renderTableHeader(cities[0])}

                            {this.renderTableData(cities)}
                        </tbody>
                    </table>
                }

                {error && 
                    <ErrorMessage message={error}/>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    Cities: state.Cities
});
  
export default connect(mapStateToProps, null)(TableContainer);