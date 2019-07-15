import React from 'react';
import styles from './styles.module.css';

const ErrorMessage = props => (
    <div className={styles.errorMessage}>
        {props.message}
    </div>
)

export default ErrorMessage;