/**
 * Created by Ilya on 15.01.2017.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Signin from '../components/signin'
import * as userActions from '../actions/UserActions'

class UserSignin extends Component {
    render() {
        const {user} = this.props;
        const {handleSignin} = this.props.userActions;
        const {errorSet} = this.props.userActions;
        return (
            <div>
                <Signin user={user} handleSignin={handleSignin} errorSet={errorSet}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserSignin)