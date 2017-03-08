/**
 * Created by Ilya on 05.01.2017.
 */
import React, {PropTypes, Component} from 'react'
import {Link} from 'react-router'

var HeadBanner = React.createClass({
    render: function () {
        return (
            <div>
                <Link to='/'>
                    <img src='../images/header.jpg'/>
                </Link>
            </div>
        );
    }
});

export default class Header extends Component {

    onSignOutClick() {
        this.props.handleSignOut();
    }

    render() {
        const {email} = this.props;
        const {isAuthenticated} = this.props;
        return (
            <div className='masterHeader'>
                <div className='masterHeader_logo'>
                    <div className='mailDisplay'>
                        <p>{email}</p>
                        {isAuthenticated ?  <a className='linkCommand' onClick={::this.onSignOutClick}>[SignOut]</a> : null}
                    </div>
                    <h2 className='titleBlock'>Blocket Dictionary</h2>
                    <HeadBanner/>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    email: PropTypes.string.isRequired,
    handleSignOut: PropTypes.func.isRequired
};
