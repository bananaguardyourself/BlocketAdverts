/**
 * Created by Ilya on 21.08.2017.
 */
import {
    GET_ADVERT_DETAILS_REQUEST,
    GET_ADVERT_DETAILS_SUCCESS,
    GET_ADVERT_DETAILS_FAIL,
    DELETE_ADVERT_REQUEST,
    DELETE_ADVERT_SUCCESS,
    DELETE_ADVERT_FAIL,
    DELETE_ADVERT_RESET,
    SHOW_DELETE_CONFIRMATION,
    CLOSE_DELETE_CONFIRMATION
} from '../constants/adverts'

const initialState = {
    id: 0,
    link: '',
    name: '',
    dateOpen: '',
    dateClosed: null,
    currentPrice: 0,
    length: 0,
    lastUpdate: '',
    picture: '',
    pictures: [],
    oldPrices: [],
    description: '',
    error: '',
    deleteError: false,
    deleteConfirmation: false,
    deleted: false
};

export default function advertdetails(state = initialState, action) {

    switch (action.type) {
        case GET_ADVERT_DETAILS_REQUEST:
            return {...state, error: ''};

        case GET_ADVERT_DETAILS_SUCCESS:
            return {
                ...state,
                id: action.payload.id,
                link: action.payload.link,
                name: action.payload.name,
                dateOpen: action.payload.dateOpen,
                dateClosed: action.payload.dateClosed,
                currentPrice: action.payload.currentPrice,
                length: action.payload.length,
                lastUpdate: action.payload.lastUpdate,
                picture: action.payload.picture,
                pictures: action.payload.pictures,
                oldPrices: action.payload.oldPrices,
                description: action.payload.description,
                error: '',
                deleted: false
            };

        case GET_ADVERT_DETAILS_FAIL:
            return {...state, error: action.payload};

        case DELETE_ADVERT_REQUEST:
            return {...state, deleteError: false};

        case DELETE_ADVERT_FAIL:
            return {...state, deleteError: true, error: action.payload, deleted: false};

        case DELETE_ADVERT_SUCCESS:
            return {...state, deleteError: false, deleted: true};

        case DELETE_ADVERT_RESET:
            return {...state, deleteError: false};

        case SHOW_DELETE_CONFIRMATION:
            return {...state, deleteConfirmation: true};

        case CLOSE_DELETE_CONFIRMATION:
            return {...state, deleteConfirmation: false};

            

        default:
            return state;
    }

}