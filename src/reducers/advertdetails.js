/**
 * Created by Ilya on 21.08.2017.
 */
import {
    GET_ADVERT_DETAILS_REQUEST,
    GET_ADVERT_DETAILS_SUCCESS,
    GET_ADVERT_DETAILS_FAIL
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
    error: ''
};

export default function advertdetails(state = initialState, action) {

    switch (action.type) {
        case GET_ADVERT_DETAILS_REQUEST:
            return {...state, error: ''};

        case GET_ADVERT_DETAILS_SUCCESS:
            return {...state,
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
                error: ''};

        case GET_ADVERT_DETAILS_FAIL:
            return {...state, error: action.payload};

        default:
            return state;
    }

}