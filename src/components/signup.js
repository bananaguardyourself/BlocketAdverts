/**
 * Created by Ilya on 15.01.2017.
 */
import React, {PropTypes, Component} from 'react'
import {Link} from 'react-router'
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
            var re = /([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})/;
            if (re.test(this.txtEmail.value)) {
                this.props.handleSignup(this.txtEmail.value, this.txtPassword.value, this.txtPasswordRepeat.value)
            }
            else {
                this.props.errorSet('Incorrect email address');
            }
        }
        else {
            this.props.errorSet('Incomplete data');
        }
    }

    componentWillMount() {
        this.props.errorSet('');
        this.props.verifiedSet(false);
    }

    componentWillUpdate() {
        const {error} = this.props.user;

        {
            error ? (this.txtPasswordRepeat.value = '', this.txtPassword.value = '') : null
        }
    }

    render() {
        const {error} = this.props.user;
        const {verified} = this.props.user;
        return (
            <div className='bodyPane'>
                <p className='headerText'>
                    <span> Sign up or </span>
                    <Link to='/signin'>sign in</Link>
                </p>
                <fieldset className={error ? 'signinFieldsetError' : 'signinFieldset' }>
                    {error ?
                        <legend className='signinError'>{error}</legend> : <legend>Sign up</legend>}

                    <p className='signinFieldset_paragraph'>
                        <input className='textEntry' ref={input => this.txtEmail = input}  placeholder='E-mail'/>
                    </p>
                    <p className='signinFieldset_paragraph'>
                        <input className='textEntry' type='password' ref={input => this.txtPassword = input} placeholder='Password'/>
                    </p>
                    <p className='signinFieldset_paragraph'>
                        <input className='textEntry' type='password' ref={input => this.txtPasswordRepeat = input} placeholder='Confirm password'/>
                    </p>
                    <div className='captcha'>
                        <Recaptcha
                            sitekey='6LeNjRIUAAAAAP3f7Q9HYN6Zvmnhq65YdBAFfzmo'
                            render='explicit'
                            verifyCallback={::this.verifyCallback}
                            onloadCallback={::this.onLoadCallback}
                            expiredCallback={::this.expiredCallback}
                        />
                    </div>
                    <p className='submitButtonPanel'>
                        <button onClick={::this.onSignUpBtnClick} className='commonBtn' disabled={!verified}>Sign Up
                        </button>
                    </p>
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