/**
 * Created by Ilya on 05.01.2017.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Adverts from '../components/adverts'
import * as advertsActions from '../actions/AdvertsActions'

class App extends Component {

    componentWillMount(){
        const {getAdverts} = this.props.advertsActions;
        getAdverts();
    }

    render() {
        const {adverts, advertsActions} = this.props;

        return (
            <div>
                <Adverts adverts={adverts.adverts} fetching={adverts.fetching}
                         error={adverts.error} advertActions = {advertsActions}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        adverts: state.adverts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        advertsActions: bindActionCreators(advertsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)