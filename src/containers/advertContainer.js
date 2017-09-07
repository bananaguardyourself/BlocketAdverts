/**
 * Created by Ilya on 20.08.2017.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import AdvertDetails from '../components/advertdetails'
import * as advertdetailsActions from '../actions/advertdetailsactions'

class AdvertContainer extends Component {
    render() {
        const {advert, advertdetailsActions, params} = this.props;

        return (
            <div>
                <AdvertDetails advert = {advert} advertdetailsactions = {advertdetailsActions} params = {params}/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        advertdetailsActions: bindActionCreators(advertdetailsActions, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        advert: state.advertdetails
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvertContainer)