/**
 * Created by Ilya on 05.08.2017.
 */
import {
    SORT_PRICE_ASC,
    SORT_PRICE_DESC
} from '../constants/sorting'
import {createSelector} from 'reselect'

const getSorting = (state) => state.sorting;
const getAdverts = (state) => state.adverts;
// const getFiltering = (state) => state.filtering;

export const getSortedAdverts = createSelector(
    [getSorting, getAdverts],
    (sorting, adverts) => {
        switch (sorting.sorting) {
            case SORT_PRICE_ASC: {
                adverts.adverts = adverts.adverts.sort(sortPricesAsc);
                return adverts;
            }
            case SORT_PRICE_DESC: {
                adverts.adverts = adverts.adverts.sort(sortPricesDesc);
                return adverts;
            }
        }
    }
);

function sortPricesAsc(a, b) {
    return a.currentPrice - b.currentPrice;
}

function sortPricesDesc(a, b) {
    return b.currentPrice - a.currentPrice;
}

// const getSortedAdvertsFiltered = createSelector(
//     [ getSortedAdverts, getFiltering ],
//     (sortedAdverts, filterAdverts) => {
//         switch (filterAdverts.closed) {
//             case true:
//                 return sortedAdverts;
//             case false:
//                 sortedAdverts.adverts = sortedAdverts.adverts.filter(t => !t.advertClosed);
//                 return sortedAdverts;
//         }
//     }
// );