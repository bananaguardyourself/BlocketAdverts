/**
 * Created by Ilya on 22.11.2017.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Restore from '../components/restore'
import * as userActions from '../actions/UserActions'

class RestoreContainer extends Component {
    render() {
        const {user} = this.props;
        const {handleRestore} = this.props.userActions;        
        const {closeModal} = this.props.userActions;
        const {errorSet} = this.props.userActions;
        const {verifiedSet} = this.props.userActions;
        return (
            <div>
                <Restore user={user} handleRestore={handleRestore} closeModal={closeModal} errorSet={errorSet} verifiedSet={verifiedSet}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(RestoreContainer)