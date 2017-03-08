/**
 * Created by Ilya on 05.02.2017.
 */
import React, {PropTypes, Component} from 'react'

export default class AdvertController extends Component {
    onAddBtnClick() {

        this.addBtn.setAttribute('disabled', 'disabled');
        this.addBtn.className = 'buttonAdd onclic';
        this.validate();
    }

    validate() {
        setTimeout(function() {
            this.advertAdd()
        }.bind(this), 2250);
    }

    advertAdd(){

        const {actions} = this.props;

        if (this.txtLink.value != '') {
            actions.addAdvert()
        }
        this.addBtn.className = 'buttonAdd validate';
        this.callback();
    }

    callback() {
        setTimeout(function() {
            this.addBtn.removeAttribute('disabled');
            this.addBtn.className = 'buttonAdd';
        }.bind(this), 1250);
    }

    render() {
        return (
            <div className='field'>
                <input className='advertLinkAdd' ref={input => this.txtLink = input}/>
                <button onClick={::this.onAddBtnClick} className='buttonAdd' ref={button => this.addBtn = button}/>
            </div>
        );
    }
}

AdvertController.propTypes = {
    actions: PropTypes.shape({
        addAdvert: PropTypes.func.IsRequired
    })
};