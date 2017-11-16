/**
 * Created by Ilya on 15.01.2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router'

export default class Signin extends Component {
    componentWillMount() {
        this.props.errorSet('');
    }

    onSigninBtnClick() {
        if (this.txtEmail.value != '' && this.txtPassword.value != '') {
            this.signInSpan.textContent = '';
            this.signInButton.className = 'button-link link-onclick';
            this.signInButton.setAttribute('disabled', 'disabled');
            this.loaderSignIn();
        }
    }

    loaderSignIn() {
        setTimeout(function () {
            this.props.handleSignin(this.txtEmail.value, this.txtPassword.value, this.setErrorSignIn.bind(this));
        }.bind(this), 300);
    }

    setErrorSignIn() {
        setTimeout(function () {
            this.signInButton.className = 'button-link deleteError';
            this.txtPassword.value = ''
            this.callbackSignIn(this.finishedSignIn.bind(this));
        }.bind(this), 600);
    }

    callbackSignIn(finishedFunction) {
        setTimeout(function () {
            this.signInButton.className = 'button-link finished';
            finishedFunction();
        }.bind(this), 1700);
    }

    finishedSignIn() {
        setTimeout(function () {
            this.signInButton.className = 'button-link';
            this.signInSpan.textContent = 'Sign In';
            this.signInButton.removeAttribute('disabled');
        }.bind(this), 400);
    }

    render() {
        const { error } = this.props.user;
        return (
            <div className='bodyPane'>
                <p className='headerText'>
                    <span> Sign in or </span>
                    <Link to='/signup'>register</Link>
                </p>
                <fieldset className={error ? 'signinFieldsetError' : 'signinFieldset'}>
                    {error ?
                        <legend className='signinError'>{error}</legend> : <legend>Authorization</legend>}

                    <p className='signinFieldset_paragraph'>
                        <input className='textEntry' ref={input => this.txtEmail = input} placeholder='E-mail' />
                    </p>
                    <p className='signinFieldset_paragraph'>
                        <input className='textEntry' type='password' ref={input => this.txtPassword = input} placeholder='Password' />
                    </p>
                    <div className='submitButtonPanel'>
                        <button onClick={this.onSigninBtnClick.bind(this)} ref={button => this.signInButton = button} className='button-link'>
                            <span ref={span => this.signInSpan = span}>Sign In</span>
                        </button>
                    </div>
                </fieldset>
                <p className='headerText'>
                    <span> Forgot your </span>
                    <Link to='/restore'>password</Link>
                    <span>?</span>
                </p>
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