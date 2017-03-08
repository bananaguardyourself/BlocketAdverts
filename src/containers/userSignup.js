/**
 * Created by Ilya on 15.01.2017.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Signup from '../components/signup'
import * as userActions from '../actions/UserActions'

class UserSignup extends Component {
    render() {
        const {user} = this.props;
        const {handleSignup} = this.props.userActions;
        const {errorSet} = this.props.userActions;
        const {verifiedSet} = this.props.userActions;
        return (
            <div>
                <Signup user={user} handleSignup={handleSignup} errorSet={errorSet} verifiedSet={verifiedSet}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserSignup)