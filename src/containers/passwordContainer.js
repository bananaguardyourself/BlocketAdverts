/**
 * Created by Ilya on 24.11.2017.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userActions from '../actions/UserActions'
import Password from '../components/password'

class PasswordContainer extends Component {
    render() {
        const {user} = this.props;
        const {handlePasswordChange} = this.props.userActions;
        const {errorSet} = this.props.userActions;
        const {verifiedSet} = this.props.userActions;
        return (
            <div>
                <Password user={user} handlePasswordChange={handlePasswordChange} errorSet={errorSet} verifiedSet={verifiedSet}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordContainer)