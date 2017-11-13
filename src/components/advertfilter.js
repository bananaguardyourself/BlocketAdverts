/**
 * Created by Ilya on 19.05.2017.
 */
import {
    SORT_PRICE_ASC,
    SORT_PRICE_DESC,
    SORT_LENGTH_ASC,
    SORT_LENGTH_DESC,
    SORT_DATE_ASC,
    SORT_DATE_DESC
} from '../constants/sorting'
import {
    SET_FILTER_CLOSED,
    SET_FILTER_DATE,
    FILTERING_DATE_ALL,
    FILTERING_DATE_WEEK,
    FILTERING_DATE_MONTH,
    FILTERING_DATE_YEAR
} from '../constants/filtering'
import React, {Component} from 'react'
import PropTypes from 'prop-types';

export default class AdvertFilter extends Component {

    handleSortChange() {
        const {setSorting} = this.props.sortingActions;
        setSorting(this.selectSorting.value);
    }

    handleShowClosedChange() {
        const {setFiltering} = this.props.filteringActions;
        const {filtering} = this.props;
        setFiltering(SET_FILTER_CLOSED, !filtering.showClosed);
        this.inputShowClosed.checked = filtering.showClosed;
    }

    handleFilterDate() {
        const {setFiltering} = this.props.filteringActions;
        setFiltering(SET_FILTER_DATE, this.selectFilterDate.value);
    }

    render() {
        const {sorting, filtering} = this.props;
        return (
            <div className='filter'>
                <a target='_blank' href='https://www.blocket.se/hela_sverige/batar/segelbat?ca=11&cg=1060&st=s&c=1062&f=p&w=3'>Link to Blocket</a>
                <p style={{height: '5px', margin: '5px'}}/>
                <input className='closedfilter' type='checkbox' ref={select => this.inputShowClosed = select} checked={filtering.showClosed} onChange={::this.handleShowClosedChange}/> Show closed
                <p style={{height: '5px', margin: '5px'}}/>
                <select className='combofilter' onChange={::this.handleSortChange} ref={select => this.selectSorting = select}
                        value={sorting.sorting}>
                    <option value={SORT_DATE_ASC}>Date ascending</option>
                    <option value={SORT_DATE_DESC}>Date descending</option>
                    <option value={SORT_LENGTH_ASC}>Length ascending</option>
                    <option value={SORT_LENGTH_DESC}>Length descending</option>
                    <option value={SORT_PRICE_ASC}>Price ascending</option>
                    <option value={SORT_PRICE_DESC}>Price descending</option>
                </select>
                <select className='combofilter' onChange={::this.handleFilterDate} ref={select => this.selectFilterDate = select}
                        value={filtering.dateFilter}>
                    <option value={FILTERING_DATE_ALL}>All dates</option>
                    <option value={FILTERING_DATE_YEAR}>Last year</option>
                    <option value={FILTERING_DATE_MONTH}>Last month</option>
                    <option value={FILTERING_DATE_WEEK}>Last week</option>
                </select>
            </div>
        );
    }
}

AdvertFilter.propTypes = {
    sortingActions: PropTypes.shape({
        setSorting: PropTypes.func.isRequired
    }),
    sorting: PropTypes.shape({
        sorting: PropTypes.string.isRequired
    }),
    filteringActions: PropTypes.shape({
        setFiltering: PropTypes.func.isRequired
    }),
    filtering: PropTypes.shape({
        showClosed: PropTypes.bool.isRequired
    })
};