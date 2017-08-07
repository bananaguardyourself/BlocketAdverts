/**
 * Created by Ilya on 05.08.2017.
 */
import {
    GET_ADVERTS_FILTER,
    SET_ADVERTS_FILTER
} from '../constants/filtering'

const initialState = {
    closed: false
};

export default function filtering(state = initialState, action) {

    switch (action.type) {
        case GET_ADVERTS_FILTER:
            return {...state, closed: action.payload.closed, sorting: action.payload.sorting};

        case SET_ADVERTS_FILTER:
            return {...state, closed: action.payload.closed, sorting: action.payload.sorting};

        default:
            return state;
    }
}