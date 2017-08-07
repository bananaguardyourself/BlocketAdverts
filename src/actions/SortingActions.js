/**
 * Created by Ilya on 05.08.2017.
 */
import {
    SORT_PRICE_ASC,
    SORT_PRICE_DESC
} from '../constants/sorting'

export function setSorting(sorting)
{
    return function (dispatch) {

        switch (sorting) {
            case SORT_PRICE_ASC: {
                dispatch({
                    type: SORT_PRICE_ASC,
                });
                break;
            }
            case SORT_PRICE_DESC: {
                dispatch({
                    type: SORT_PRICE_DESC,
                });
                break;
            }
        }
    }
}