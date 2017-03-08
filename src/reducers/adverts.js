/**
 * Created by Ilya on 07.01.2017.
 */
import {
    GET_ADVERTS_REQUEST,
    GET_ADVERTS_SUCCESS,
    GET_ADVERTS_FAIL
} from '../constants/adverts'

const initialState = {
    adverts: [],
    fetching: false,
    error: ''
};

export default function adverts(state = initialState, action) {

    switch (action.type) {
        case GET_ADVERTS_REQUEST:
            return {...state, fetching: true};

        case GET_ADVERTS_SUCCESS:
            return {...state, adverts: action.payload, fetching: false};

        case GET_ADVERTS_FAIL:
            return {...state, error: action.payload, fetching: false};
        default:
            return state;
    }

}