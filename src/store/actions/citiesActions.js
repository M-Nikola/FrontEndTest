import {
    GET_CITIES,
    FETCHING,
    FETCHING_ERROR
} from '../types';
import axios from 'axios';
import { setDefaultPropertyValues } from '../../utilities/functions';

export const getCities = (from, to, token) => {
    return dispatch => {
        dispatch({
            type: FETCHING
        });

        axios({
            method: 'GET',
            url: `https://f-test-02.glitch.me/data?from=${from}&to=${to}`+ (token ? `&token=${token}` : '')
        }).then(response => {
            const { data, token } = response.data;
            
            const dataLength = data.length;
            let cities = [];
            
            // dumb check if data array doesn't have missing elements 
            if (dataLength === to - from + 1) {
                cities = data;
            } else {
                let j = 0;
                for (let i = from; i <= to; i++) {
                    if (j < dataLength) {
                        if (data[j].index === i) {
                            cities.push(setDefaultPropertyValues(data[j]));
                            j++;
                            continue;
                        } 
                    } 
    
                    cities.push({ index: i, slot: 0, city: 'None', velocity: '0.00' });
                }
            }

            dispatch({
                type: GET_CITIES,
                payload: { cities, token }
            });
        }).catch(error => {
            const response = error.response;
            dispatch({
                type: FETCHING_ERROR,
                payload: { 
                    error: response.data.error.message,
                    statusCode: response.status
                }
            });
        });
    }
}