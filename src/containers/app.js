/**
 * Created by Ilya on 05.01.2017.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Adverts from '../components/adverts'
import * as advertsActions from '../actions/AdvertsActions'
import * as sortingActions from '../actions/SortingActions'
import { getSortedAdverts } from '../selectors'

class App extends Component {

    componentWillMount(){
        const {getAdverts} = this.props.advertsActions;
        getAdverts();
    }

    render() {
        const {adverts, advertsActions, sorting, sortingActions} = this.props;

        return (
            <div>
                <Adverts adverts={adverts.adverts} fetching={adverts.fetching}
                         error={adverts.error} advertActions = {advertsActions} deleteConfirmation={adverts.deleteConfirmation}
                         sortingActions={sortingActions} sorting={sorting}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        adverts: getSortedAdverts(state),
        sorting: state.sorting
    }
}

function mapDispatchToProps(dispatch) {
    return {
        advertsActions: bindActionCreators(advertsActions, dispatch),
        sortingActions: bindActionCreators(sortingActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)