/**
 * Created by Ilya on 05.08.2017.
 */
import {
    SORT_PRICE_ASC,
    SORT_PRICE_DESC,
    SORT_LENGTH_ASC,
    SORT_LENGTH_DESC,
    SORT_DATE_ASC,
    SORT_DATE_DESC,
} from '../constants/sorting'

import  {
    FILTERING_DATE_YEAR,
    FILTERING_DATE_MONTH,
    FILTERING_DATE_WEEK
} from '../constants/filtering'

import {createSelector} from 'reselect'
import moment from 'moment'

const getSorting = (state) => state.sorting;
const getAdverts = (state) => state.adverts;
const getFiltering = (state) => state.filtering;

const getFilteredAdverts = createSelector(
    [getFiltering, getAdverts],
    (filtering, adverts) => {
        let filteredAdverts = {
            adverts: adverts.adverts,
            fetching: adverts.fetching,
            error: adverts.error,
            deleteError: adverts.deleteError,
            deleteConfirmation: adverts.deleteConfirmation,
            filter: adverts.filter
        };

        if (!filtering.showClosed) {
            filteredAdverts.adverts = filteredAdverts.adverts.filter(p => !p.dateClosed)
        }

        let now = moment();

        switch (filtering.dateFilter) {
            case FILTERING_DATE_YEAR:
                filteredAdverts.adverts = filteredAdverts.adverts.filter(p => moment(p.dateOpen, 'DD.MM.YYYY').add(1, 'years') > now)
                break;
            case FILTERING_DATE_MONTH:
                filteredAdverts.adverts = filteredAdverts.adverts.filter(p => moment(p.dateOpen, 'DD.MM.YYYY').add(1, 'months') > now)
                break;
            case FILTERING_DATE_WEEK:
                filteredAdverts.adverts = filteredAdverts.adverts.filter(p => moment(p.dateOpen, 'DD.MM.YYYY').add(7, 'days') > now)
                break;
            default:
        }


        return filteredAdverts
    }
);

export const getSortedFilteredAdverts = createSelector(
    [getSorting, getFilteredAdverts],
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
            case SORT_LENGTH_ASC: {
                adverts.adverts = adverts.adverts.sort(sortLengthAsc);
                return adverts;
            }
            case SORT_LENGTH_DESC: {
                adverts.adverts = adverts.adverts.sort(sortLengthDesc);
                return adverts;
            }
            case SORT_DATE_ASC: {
                adverts.adverts = adverts.adverts.sort(sortDateAsc);
                return adverts;
            }
            case SORT_DATE_DESC: {
                adverts.adverts = adverts.adverts.sort(sortDateDesc);
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

function sortLengthAsc(a, b) {
    return a.length - b.length;
}

function sortLengthDesc(a, b) {
    return b.length - a.length;
}

function sortDateAsc(a, b) {
    let dateA = moment(a.dateOpen, 'DD.MM.YYYY');
    let dateB = moment(b.dateOpen, 'DD.MM.YYYY');
    if (dateA > dateB) return 1;
    else if (dateA < dateB) return -1;
    else return 0;
}

function sortDateDesc(a, b) {
    let dateA = moment(a.dateOpen, 'DD.MM.YYYY');
    let dateB = moment(b.dateOpen, 'DD.MM.YYYY');
    if (dateB > dateA) return 1;
    else if (dateB < dateA) return -1;
    else return 0;
}