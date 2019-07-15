import React from 'react';
import styles from './styles.module.css';

const LabeledInput = ({ label, inputClassName, ...inputProps }) => (
    <div className={styles.inputContainer}>
        {label && 
            <label>{label}</label>
        }

        <input 
            {...inputProps}
            className={styles[inputClassName]}    
        />
    </div>
)

export default LabeledInput;