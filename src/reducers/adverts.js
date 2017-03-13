/**
 * Created by Ilya on 07.01.2017.
 */
import {
    GET_ADVERTS_REQUEST,
    GET_ADVERTS_SUCCESS,
    GET_ADVERTS_FAIL,
    ADD_ADVERTS_REQUEST,
    ADD_ADVERTS_SUCCESS,
    ADD_ADVERTS_FAIL,
    DELETE_ADVERT_REQUEST,
    DELETE_ADVERT_SUCCESS,
    DELETE_ADVERT_FAIL,
    DELETE_ADVERT_RESET
} from '../constants/adverts'

const initialState = {
    adverts: [],
    fetching: false,
    error: '',
    deleteError: false
};

export default function adverts(state = initialState, action) {

    switch (action.type) {
        case GET_ADVERTS_REQUEST:
            return {...state, fetching: true};

        case GET_ADVERTS_SUCCESS:
            return {...state, adverts: action.payload, fetching: false, error: ''};

        case GET_ADVERTS_FAIL:
            return {...state, error: action.payload, fetching: false};

        case ADD_ADVERTS_REQUEST:
            return {...state, fetching: true};

        case ADD_ADVERTS_SUCCESS:
            return {...state, adverts: action.payload, fetching: false};

        case ADD_ADVERTS_FAIL:
            return {...state, fetching: false};

        case DELETE_ADVERT_REQUEST:
            return {...state, deleteError: false};

        case DELETE_ADVERT_FAIL:
            return {...state, deleteError: true};

        case DELETE_ADVERT_SUCCESS:
            return {...state, adverts: state.adverts.filter(advert => advert.id !== action.payload), deleteError: false};

        case DELETE_ADVERT_RESET:
            return {...state, deleteError: false};

        default:
            return state;
    }

}