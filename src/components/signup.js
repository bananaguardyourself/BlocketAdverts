/**
 * Created by Ilya on 15.01.2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router'
import Recaptcha from 'react-recaptcha'

export default class Signup extends Component {
    verifyCallback(response) {
        this.props.verifiedSet(response)
    }

    expiredCallback() {
        this.props.verifiedSet(false)
    }

    onLoadCallback() {
        console.log('Done!!!!');
    }

    onSignUpBtnClick() {
        if (this.txtEmail.value != '' && this.txtPassword.value != '' && this.txtPasswordRepeat.value != '') {
            const re = /([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})/;
            if (re.test(this.txtEmail.value)) {
                this.signUpSpan.textContent = '';
                this.signUpButton.className = 'button-link link-onclick';
                this.signUpButton.setAttribute('disabled', 'disabled');
                this.loaderSignUp();                               
            }
            else {
                this.props.errorSet('Incorrect email address');
            }
        }
        else {
            this.props.errorSet('Incomplete data');
        }
    }

    loaderSignUp() {
        setTimeout(function () {
            this.props.handleSignup(this.txtEmail.value, this.txtPassword.value, this.txtPasswordRepeat.value,this.setErrorSignUp.bind(this));
        }.bind(this), 300);
    }

    setErrorSignUp() {
        setTimeout(function () {
            this.signUpButton.className = 'button-link deleteError';
            this.txtPasswordRepeat.value = '';
            this.txtPassword.value = '';
            this.callbackSignIn(this.finishedSignUp.bind(this));
        }.bind(this), 600);
    }

    callbackSignUp(finishedFunction) {
        setTimeout(function () {
            this.signUpButton.className = 'button-link finished';
            finishedFunction();
        }.bind(this), 1700);
    }

    finishedSignUp() {
        setTimeout(function () {
            this.signUpButton.className = 'button-link';
            this.signUpSpan.textContent = 'Sign Up';
            this.signUpButton.removeAttribute('disabled');
        }.bind(this), 400);
    }


    componentWillMount() {
        this.props.errorSet('');
        this.props.verifiedSet(false);
    }

    componentWillUpdate() {
        const { error } = this.props.user;

        {
            error ? (this.txtPasswordRepeat.value = '', this.txtPassword.value = '') : null
        }
    }

    render() {
        const { error } = this.props.user;
        const { verified } = this.props.user;
        return (
            <div className='bodyPane'>
                <p className='headerText'>
                    <span> Sign up or </span>
                    <Link to='/signin'>sign in</Link>
                </p>
                <fieldset className={error ? 'signinFieldsetError' : 'signinFieldset'}>
                    {error ?
                        <legend className='signinError'>{error}</legend> : <legend>Sign up</legend>}

                    <p className='signinFieldset_paragraph'>
                        <input className='textEntry' ref={input => this.txtEmail = input} placeholder='E-mail' />
                    </p>
                    <p className='signinFieldset_paragraph'>
                        <input className='textEntry' type='password' ref={input => this.txtPassword = input} placeholder='Password' />
                    </p>
                    <p className='signinFieldset_paragraph'>
                        <input className='textEntry' type='password' ref={input => this.txtPasswordRepeat = input} placeholder='Confirm password' />
                    </p>
                    <div className='captcha'>
                        <Recaptcha
                            sitekey='6LeNjRIUAAAAAP3f7Q9HYN6Zvmnhq65YdBAFfzmo'
                            render='explicit'
                            verifyCallback={this.verifyCallback.bind(this)}
                            onloadCallback={this.onLoadCallback.bind(this)}
                            expiredCallback={this.expiredCallback.bind(this)}
                        />
                    </div>
                    <div className='submitButtonPanel'>
                        <button onClick={this.onSignUpBtnClick.bind(this)} ref={button => this.signUpButton = button}
                            className={verified ? 'button-link' : 'button-link-disabled'} disabled = {!verified}>
                            <span  ref={span => this.signUpSpan = span}>Sign Up</span>
                        </button>
                    </div>
                </fieldset>
            </div>
        );
    }
}

Signup.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        error: PropTypes.string.isRequired,
        verified: PropTypes.bool.isRequired
    }),
    handleSignup: PropTypes.func.isRequired,
    errorSet: PropTypes.func.isRequired,
    verifiedSet: PropTypes.func.isRequired
};