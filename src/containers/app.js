/**
 * Created by Ilya on 05.01.2017.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Adverts from '../components/adverts'
import * as advertsActions from '../actions/AdvertsActions'
import * as sortingActions from '../actions/SortingActions'
import * as filteringActions from '../actions/FilteringActions'
import {getSortedFilteredAdverts} from '../selectors'

class App extends Component {

    componentWillMount() {
        const {getAdverts} = this.props.advertsActions;
        getAdverts();
    }

    render() {
        const {adverts, advertsActions, sorting, sortingActions, filtering, filteringActions} = this.props;

        return (
            <div>
                <Adverts adverts={adverts.adverts} fetching={adverts.fetching}
                         error={adverts.error} advertActions={advertsActions}
                         deleteConfirmation={adverts.deleteConfirmation}
                         selectedId={adverts.selectedId}
                         sortingActions={sortingActions} sorting={sorting} filteringActions={filteringActions}
                         filtering={filtering}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        adverts: getSortedFilteredAdverts(state),
        sorting: state.sorting,
        filtering: state.filtering
    }
}

function mapDispatchToProps(dispatch) {
    return {
        advertsActions: bindActionCreators(advertsActions, dispatch),
        sortingActions: bindActionCreators(sortingActions, dispatch),
        filteringActions: bindActionCreators(filteringActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)