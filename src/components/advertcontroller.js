/**
 * Created by Ilya on 05.02.2017.
 */
import React, {PropTypes, Component} from 'react'

export default class AdvertController extends Component {
    onAddBtnClick() {
        if (this.txtLink.value != '') {
            this.addSpan.textContent='';
            this.addBtn.setAttribute('disabled', 'disabled');
            this.addBtn.className = 'buttonAdd onclic';
            this.validate();
        }
    }

    validate() {
        setTimeout(function () {
            this.advertAdd()
        }.bind(this), 1000);
    }

    advertAdd() {

        const {addAdvert} = this.props.actions;

        addAdvert(this.txtLink.value, function () {
                this.addBtn.className = 'buttonAdd validate';
                this.txtLink.value = '';
                this.callback(this.finishedFunction.bind(this));
            }.bind(this),
            function () {
                this.addBtn.className = 'buttonAdd notvalidate';
                this.callback(this.finishedFunction.bind(this));
            }.bind(this))

    }

    callback(finished) {
        setTimeout(function () {
            this.addBtn.className = 'buttonAdd finished';
            this.addBtn.removeAttribute('disabled');
            finished();
        }.bind(this), 1700);
    }

    finishedFunction() {
        setTimeout(function () {
            this.addSpan.textContent = 'ADD';
            this.addBtn.className = 'buttonAdd'
        }.bind(this), 400);
    }

    render() {
        return (
            <div className='field'>
                <input className='advertLinkAdd' ref={input => this.txtLink = input}/>
                <button onClick={::this.onAddBtnClick} className='buttonAdd' ref={button => this.addBtn = button}><span ref={span => this.addSpan = span}>ADD</span></button>
            </div>
        );
    }
}

AdvertController.propTypes = {
    actions: PropTypes.shape({
        addAdvert: PropTypes.func.isRequired
    })
};