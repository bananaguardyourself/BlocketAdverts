/**
 * Created by Ilya on 20.08.2017.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import AdvertDetails from '../components/advertdetails'
import * as advertdetailsActions from '../actions/AdvertDetailsActions'
import * as advertsActions from '../actions/AdvertsActions'

class AdvertContainer extends Component {
    render() {
        const {advert, advertdetailsActions, advertsActions, params} = this.props;

        return (
            <div>
                <AdvertDetails advert = {advert} advertdetailsactions = {advertdetailsActions} advertactions={advertsActions} params = {params}/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        advertsActions: bindActionCreators(advertsActions, dispatch),
        advertdetailsActions: bindActionCreators(advertdetailsActions, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        advert: state.advertdetails
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvertContainer)