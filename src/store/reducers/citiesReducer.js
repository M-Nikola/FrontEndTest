import {
    GET_CITIES,
    FETCHING,
    FETCHING_ERROR
} from '../types';

const initialState = {
    cities: [],
    fetching: false
  };

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CITIES:
            const { cities, token } = action.payload;
            return {
                cities,
                token,
                fetching: false
            };
        case FETCHING: {
            return {
                ...state,
                fetching: true,
                error: ''
            }
        }
        case FETCHING_ERROR: {
            const { error, statusCode } = action.payload;
            return {
                token: statusCode === 400 ? token : undefined, 
                fetching: false,
                error
            }
        }
        default:
            return state;
    }
}