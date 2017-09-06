/**
 * Created by Ilya on 05.08.2017.
 */
import {
    SET_FILTER_CLOSED,
    SET_FILTER_DATE,
    FILTERING_DATE_ALL
} from '../constants/filtering'

const initialState = {
    showClosed: false,
    dateFilter: FILTERING_DATE_ALL
};

export default function filtering(state = initialState, action) {

    switch (action.type) {
        case SET_FILTER_CLOSED:
            return {...state, showClosed: action.payload};
        case SET_FILTER_DATE:
            return {...state, dateFilter: action.payload};
        default:
            return state;
    }
}