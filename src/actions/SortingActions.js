/**
 * Created by Ilya on 05.08.2017.
 */
import {
    SET_SORTING,
    SORT_PRICE_ASC,
    SORT_PRICE_DESC,
    SORT_LENGTH_ASC,
    SORT_LENGTH_DESC,
    SORT_DATE_ASC,
    SORT_DATE_DESC
} from '../constants/sorting'

export function setSorting(sorting)
{
    return function (dispatch) {

        switch (sorting) {
            case SORT_PRICE_ASC: {
                dispatch({
                    type: SET_SORTING,
                    payload: SORT_PRICE_ASC
                });
                break;
            }
            case SORT_PRICE_DESC: {
                dispatch({
                    type: SET_SORTING,
                    payload: SORT_PRICE_DESC,
                });
                break;
            }
            case SORT_LENGTH_ASC: {
                dispatch({
                    type: SET_SORTING,
                    payload: SORT_LENGTH_ASC,
                });
                break;
            }
            case SORT_LENGTH_DESC: {
                dispatch({
                    type: SET_SORTING,
                    payload: SORT_LENGTH_DESC,
                });
                break;
            }
            case SORT_DATE_ASC: {
                dispatch({
                    type: SET_SORTING,
                    payload: SORT_DATE_ASC,
                });
                break;
            }
            case SORT_DATE_DESC: {
                dispatch({
                    type: SET_SORTING,
                    payload: SORT_DATE_DESC,
                });
                break;
            }
        }
    }
}