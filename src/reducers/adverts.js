/**
 * Created by Ilya on 07.01.2017.
 */
import {
    GET_ADVERTS_REQUEST,
    GET_ADVERTS_SUCCESS,
    GET_ADVERTS_FAIL,
    ADD_ADVERT_REQUEST,
    ADD_ADVERT_SUCCESS,
    ADD_ADVERT_FAIL,
    DELETE_ADVERT_REQUEST,
    DELETE_ADVERT_SUCCESS,
    DELETE_ADVERT_FAIL,
    DELETE_ADVERT_RESET,
    UPDATE_ADVERT_REQUEST,
    UPDATE_ADVERT_FAIL,
    UPDATE_ADVERT_SUCCESS,
    SHOW_DELETE_CONFIRMATION,
    CLOSE_DELETE_CONFIRMATION
} from '../constants/adverts'

const initialState = {
    adverts: [],
    fetching: false,
    error: '',
    deleteError: false,
    deleteConfirmation: false,
    filter: false
};

export default function adverts(state = initialState, action) {

    switch (action.type) {
        case GET_ADVERTS_REQUEST:
            return {...state, fetching: true};

        case GET_ADVERTS_SUCCESS:
            return {...state, adverts: action.payload, fetching: false, error: ''};

        case GET_ADVERTS_FAIL:
            return {...state, error: action.payload, fetching: false};

        case ADD_ADVERT_REQUEST:
            return {...state, fetching: true};

        case ADD_ADVERT_SUCCESS:
            return {...state, adverts: action.payload, fetching: false};

        case ADD_ADVERT_FAIL:
            return {...state, fetching: false};

        case DELETE_ADVERT_REQUEST:
            return {...state, deleteError: false};

        case DELETE_ADVERT_FAIL:
            return {...state, deleteError: true};

        case DELETE_ADVERT_SUCCESS:
            return {
                ...state,
                adverts: state.adverts.filter(advert => advert.id !== action.payload),
                deleteError: false
            };

        case DELETE_ADVERT_RESET:
            return {...state, deleteError: false};

        case UPDATE_ADVERT_REQUEST:
            return {...state};

        case UPDATE_ADVERT_FAIL:
            return {...state};

        case UPDATE_ADVERT_SUCCESS:
            return {
                ...state,
                adverts: state.adverts.map(advert => advert.id === action.id ? {
                        ...advert,
                        advertName: action.payload.advertName,
                        advertPicture: action.payload.advertPicture,
                        advertLength: action.payload.advertLength,
                        advertPrice: action.payload.advertPrice,
                        advertOpen: action.payload.advertOpen,
                        advertClosed: action.payload.advertClosed,
                        advertUpdated: action.payload.advertUpdated,
                        advertOldPrices: action.payload.advertOldPrices,
                        lastUpdate: action.payload.lastUpdate
                    } : advert)
            };
        case SHOW_DELETE_CONFIRMATION:
            return {...state, deleteConfirmation: true};

        case CLOSE_DELETE_CONFIRMATION:
            return {...state, deleteConfirmation: false};


        default:
            return state;
    }

}