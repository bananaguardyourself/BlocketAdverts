/**
 * Created by Ilya on 05.08.2017.
 */
import {
    SORT_PRICE_ASC,
    SORT_PRICE_DESC
} from '../constants/sorting'

const initialState = {
    sorting: SORT_PRICE_ASC
};

export default function sorting(state = initialState, action) {

    switch (action.type) {
        case SORT_PRICE_ASC:
            return {...state, sorting: SORT_PRICE_ASC};

        case SORT_PRICE_DESC:
            return {...state, sorting: SORT_PRICE_DESC};

        default:
            return state;
    }
}