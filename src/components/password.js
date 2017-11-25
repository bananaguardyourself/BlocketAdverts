/**
 * Created by Ilya on 22.11.2017.
 */
import React, { Component } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types';
import { Link } from 'react-router'
import Recaptcha from 'react-recaptcha'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'solid #001AAA 1px'
    }
};

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

    onRestoreBtnClick() {
        if (this.txtEmail.value != '') {
            const re = /([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})/;
            if (re.test(this.txtEmail.value)) {
                this.restoreSpan.textContent = '';
                this.restoreButton.className = 'button-link link-onclick';
                this.restoreButton.setAttribute('disabled', 'disabled');
                this.loaderRestore();
            }
            else {
                this.props.errorSet('Incorrect email address');
            }
        }
        else {
            this.props.errorSet('Incomplete data');
        }
    }

    loaderRestore() {
        setTimeout(function () {
            this.props.handleRestore(this.txtEmail.value);
        }.bind(this), 300);
    }

    onModalOkClick() {
        this.props.closeModal();
        this.restoreButton.className = 'button-link';        
        this.restoreButton.removeAttribute('disabled');
        this.restoreSpan.textContent = 'Restore';
    }

    componentWillMount() {
        this.props.errorSet('');
        this.props.verifiedSet(false);
    }

    render() {
        const { error } = this.props.user;
        const { verified } = this.props.user;
        const { modalShow } = this.props.user;

        return (
            <div className='bodyPane'>
                <p className='headerText'>
                    <Link to='/signup'>Sign up </Link>
                    <span> or </span>
                    <Link to='/signin'> sign in</Link>
                </p>
                <fieldset className={error ? 'signinFieldsetError' : 'signinFieldset'}>
                    {error ?
                        <legend className='signinError'>{error}</legend> : <legend>Restore</legend>}

                    <p className='signinFieldset_paragraph'>
                        <input className='textEntry' ref={input => this.txtEmail = input} placeholder='E-mail' />
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
                        <button onClick={this.onRestoreBtnClick.bind(this)} ref={button => this.restoreButton = button}
                            className={verified ? 'button-link' : 'button-link-disabled'} disabled={!verified}>
                            <span ref={span => this.restoreSpan = span}>Restore</span>
                        </button>
                    </div>
                </fieldset>
                <Modal
                    isOpen={modalShow}
                    style={customStyles}
                    contentLabel='restoreModal'
                >
                    <div className='restoreModal'>
                        <h3 className='restoreHeader'>{error}</h3>
                        <button className='button-link'
                            onClick={this.onModalOkClick.bind(this)}><span>OK</span>
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

Password.propTypes = {
    user: PropTypes.shape({
        error: PropTypes.string.isRequired,
        verified: PropTypes.bool.isRequired
    }),
    handleRestore: PropTypes.func.isRequired,
    errorSet: PropTypes.func.isRequired,
    verifiedSet: PropTypes.func.isRequired
};