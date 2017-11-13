/**
 * Created by Ilya on 15.01.2017.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router'

export default class Signin extends Component {
    onSigninBtnClick() {
        if (this.txtEmail.value != '' && this.txtPassword.value != '') {
            this.props.handleSignin(this.txtEmail.value, this.txtPassword.value)
        }
    }

    componentWillMount()
    {
        this.props.errorSet('');
    }

    componentWillUpdate() {
        const {error} = this.props.user;
        {
            error ? this.txtPassword.value = '' : null
        }
    }

    render() {
        const {error} = this.props.user;
        return (
            <div className='bodyPane'>
                <p className='headerText'>
                    <span> Sign in or </span>
                    <Link to='/signup'>register</Link>
                </p>
                <fieldset className={error ? 'signinFieldsetError' : 'signinFieldset' }>
                    {error ?
                        <legend className='signinError'>{error}</legend> : <legend>Authorization</legend>}

                    <p className='signinFieldset_paragraph'>
                        <input className='textEntry' ref={input => this.txtEmail = input} placeholder='E-mail'/>
                    </p>
                    <p className='signinFieldset_paragraph'>
                        <input className='textEntry' type='password' ref={input => this.txtPassword = input} placeholder='Password'/>
                    </p>
                    <p className='submitButtonPanel'>
                        <button onClick={::this.onSigninBtnClick} className='commonBtn'>Sign In</button>
                    </p>
                </fieldset>
            </div>
        );
    }
}

Signin.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        error: PropTypes.string.isRequired
    }),
    handleSignin: PropTypes.func.isRequired,
    errorSet: PropTypes.func.isRequired
};