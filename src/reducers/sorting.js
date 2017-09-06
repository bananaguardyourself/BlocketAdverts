/**
 * Created by Ilya on 05.08.2017.
 */
import {
    SET_SORTING,
    SORT_DATE_ASC
} from '../constants/sorting'

const initialState = {
    sorting: SORT_DATE_ASC
};

export default function sorting(state = initialState, action) {

    switch (action.type) {
        case SET_SORTING:
            return {...state, sorting: action.payload};

        default:
            return state;
    }
}