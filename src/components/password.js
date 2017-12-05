/**
 * Created by Ilya on 22.11.2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router'
import Recaptcha from 'react-recaptcha'

export default class Password extends Component {
    verifyCallback(response) {
        this.props.verifiedSet(response)
    }

    expiredCallback() {
        this.props.verifiedSet(false)
    }

    onLoadCallback() {
        console.log('Done!!!!');
    }

    onOKBtnClick() {
        if (this.txtPassword.value != '' && this.txtPasswordRepeat.value != '') {
            this.OKSpan.textContent = '';
            this.OKButton.className = 'button-link link-onclick';
            this.OKButton.setAttribute('disabled', 'disabled');
            this.loaderPasswordChange();
        }
        else {
            this.props.errorSet('Incomplete data');
        }
    }

    loaderPasswordChange() {
        setTimeout(function () {
            let userCode = this.props.params.code;
            this.props.handlePasswordChange(userCode, this.txtPassword.value, this.txtPasswordRepeat.value);
            this.finishedPasswordChange();
        }.bind(this), 300);
    }

    finishedPasswordChange() {
        setTimeout(function () {
            if (this.OKSpan) {
                this.OKSpan.textContent = 'Restore';
                this.OKButton.className = 'button-link';
                this.OKButton.removeAttribute('disabled');
            }
        }.bind(this), 400);
    }

    componentWillMount() {
        let userCode = this.props.params.code;
        this.props.errorSet('');
        this.props.verifiedSet(false);
        this.props.getUserRestoreInfo(userCode);
    }

    render() {
        const { error } = this.props.user;
        const { verified } = this.props.user;

        return (
            <div className='bodyPane'>
                <p className='headerText'>
                    <Link to='/signup'>Sign up </Link>
                    <span> or </span>
                    <Link to='/signin'> sign in</Link>
                </p>
                {error === 'No such user' ? <h1>No such user </h1> :
                    <fieldset className={error ? 'signinFieldsetError' : 'signinFieldset'}>
                        {error ?
                            <legend className='signinError'>{error}</legend> : <legend>Restore</legend>}
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
                            <button onClick={this.onOKBtnClick.bind(this)} ref={button => this.OKButton = button}
                                className={verified ? 'button-link' : 'button-link-disabled'} disabled={!verified}>
                                <span ref={span => this.OKSpan = span}>Restore</span>
                            </button>
                        </div>
                    </fieldset>
                }
            </div>
        );
    }
}

Password.propTypes = {
    user: PropTypes.shape({
        error: PropTypes.string.isRequired,
        verified: PropTypes.bool.isRequired
    }),
    handlePasswordChange: PropTypes.func.isRequired,
    getUserRestoreInfo: PropTypes.func.isRequired,
    errorSet: PropTypes.func.isRequired,
    verifiedSet: PropTypes.func.isRequired
};