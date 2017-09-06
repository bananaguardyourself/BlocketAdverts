import React from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/UserActions'
import {bindActionCreators} from 'redux'

export default function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {
        componentWillMount() {
            this.props.userActions.getUserInfo();
        }

        render() {
            if (this.props.user.isAuthenticated)
            {
                return (
                    <div>
                        <Component {...this.props} />
                    </div>
                )
            }
            else
            {
                return (
                    <div>
                    </div>
                )
            }
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }

    function mapDispatchToProps(dispatch) {
        return {
            userActions: bindActionCreators(userActions, dispatch)
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
}