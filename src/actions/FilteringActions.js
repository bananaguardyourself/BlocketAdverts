/**
 * Created by Ilya on 05.08.2017.
 */
import  {
    SET_FILTER_CLOSED,
    SET_FILTER_DATE
} from '../constants/filtering'

export function setFiltering(filtering, filterValue)
{
    return function (dispatch) {

        switch (filtering) {
            case SET_FILTER_CLOSED: {
                dispatch({
                    type: SET_FILTER_CLOSED,
                    payload: filterValue
                });
                break;
            }
            case SET_FILTER_DATE: {
                dispatch({
                    type: SET_FILTER_DATE,
                    payload: filterValue
                });
                break;
            }

        }
    }
}