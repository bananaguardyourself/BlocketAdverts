/**
 * Created by Ilya on 05.01.2017.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Header from '../components/header'
import {bindActionCreators} from 'redux'
import * as userActions from '../actions/UserActions'

class Masterpage extends Component {
    render() {
        const {user} = this.props;
        const {handleSignOut} = this.props.userActions;
        return (
            <div>
                <div className='masterPage'>
                    <Header email={user.email} isAuthenticated={user.isAuthenticated} handleSignOut={handleSignOut} />
                    <div className='centerPane'>
                        {this.props.children}
                    </div>
                    <div className='masterFooterDummy'>
                    </div>
                </div>
                <div className='masterFooterWrapper'>
                    <div className='mainFooter'>
                    </div>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Masterpage)
