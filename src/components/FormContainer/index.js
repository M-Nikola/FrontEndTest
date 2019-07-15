import React, { Component, Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from './styles.module.css';

import { connect } from 'react-redux';
import { getCities } from '../../store/actions/citiesActions';
import { bindActionCreators } from 'redux';

import LabeledInput from '../LabeledInput';
import ErrorMessage from '../ErrorMessage';
import { strings } from '../../utilities/constants';

class FormContainer extends Component {
    render() {
        return (
            <Formik
                initialValues={{ from: 1, to: 20 }}
                onSubmit={values => {
                    if (!this.props.Cities.fetching) {
                        this.props.getCities(values.from, values.to, this.props.Cities.token);
                    }
                }}
                validationSchema={Yup.object().shape({
                    from: Yup.number()
                        .integer(strings.integerErrorMessage)
                        .min(1, strings.rangeErrorMessage)
                        .max(1000, strings.rangeErrorMessage)
                        .required(strings.requiredErrorMessage),
                    to: Yup.number()
                        .integer(strings.integerErrorMessage)
                        .min(1, strings.rangeErrorMessage)
                        .max(1000, strings.rangeErrorMessage)
                        .moreThan(Yup.ref('from'), strings.moreThenErrorMessage)
                        .required(strings.requiredErrorMessage)
                })}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    } = props;
                    const inputs = Object.keys(values);
                    return (
                        <form 
                            onSubmit={handleSubmit}
                            className={styles.formContainer}
                        >
                            {inputs.map(input => {
                                const label = strings[input];
                                const inputError = errors[input];
                                const inputTouched = touched[input];
                                
                                return (
                                    <Fragment key={input}>
                                        <LabeledInput 
                                            label={label}
                                            
                                            id={input}
                                            placeholder={label}
                                            type="number"
                                            value={values[input]}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            inputClassName={
                                                inputError && inputTouched ? 'error' : ''
                                            }
                                        />

                                        {inputError && inputTouched && (
                                            <ErrorMessage message={inputError}/>
                                        )}
                                    </Fragment>
                                )
                            })}
                              
                            <button type="submit" disabled={this.props.Cities.fetching}>
                                {strings.submit}
                            </button>
                        </form>
                    );
                }}
            </Formik>
        )
    }
}

const mapStateToProps = state => {
    return {
        Cities: state.Cities
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getCities
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);