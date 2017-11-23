/**
 * Created by Ilya on 23.11.2017.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import CancelRestore from '../components/cancelrestore'
import * as userActions from '../actions/UserActions'

class CancelRestoreContainer extends Component {
    render() {
        const {cancelRestore} = this.props.userActions;
        const {user} = this.props;
        const {params} = this.props;

        return (
            <div>
                <CancelRestore user = {user} cancelRestore = {cancelRestore} params = {params}/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelRestoreContainer)