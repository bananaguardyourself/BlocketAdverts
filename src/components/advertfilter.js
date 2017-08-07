/**
 * Created by Ilya on 19.05.2017.
 */
import {
    SORT_PRICE_ASC,
    SORT_PRICE_DESC
} from '../constants/sorting'
import React, {PropTypes, Component} from 'react'

export default class AdvertFilter extends Component {

    handleSortChange() {
        const {setSorting} = this.props.sortingActions;
        setSorting(this.selectSorting.value);
    }

    render() {
        const {sorting} = this.props;
        return (
            <div className=''>
                <select className='' onChange={::this.handleSortChange} ref={select => this.selectSorting = select}
                        value={sorting.sorting}>
                    <option value={SORT_PRICE_ASC}>Price ascending</option>
                    <option value={SORT_PRICE_DESC}>Price descending</option>
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
    })
};