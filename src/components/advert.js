/**
 * Created by Ilya on 09.08.2017.
 */
import React, {Component} from 'react'
import Modal from 'react-modal'
import {Link} from 'react-router'

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

export default class Advert extends Component {

    onLinkClick() {
        window.open(this.props.advert.link, '_blank');
    }

    onCancelDeleteClick() {
        this.props.advertActions.closeDeleteConfirmation();
        this.deleteButton.removeAttribute('disabled');
    }

    onDeleteClick() {
        this.props.advertActions.showDeleteConfirmation(this.props.advert.id);
    }

    onConfirmDeleteClick() {
        this.props.advertActions.closeDeleteConfirmation();
        this.props.advertActions.deleteAdvert(this.props.advert.id, this.loaderDelete);
        this.deleteButton.setAttribute('disabled', 'disabled');
    }

    loaderDelete() {
        setTimeout(function () {
            if (this.deleteSpan !== null) {
                this.deleteSpan.textContent = '';
                this.deleteButton.className = 'button-link link-onclick';
                this.setErrorDelete(this.callbackDelete)
            }
        }, 500);
    }

    setErrorDelete(callbackFunction) {
        setTimeout(function () {
            if (this.deleteButton !== null) {
                this.deleteButton.className = 'button-link deleteError';
                callbackFunction(this.finishedDelete);
            }
        }, 1000);
    }

    callbackDelete(finishedFunction) {
        setTimeout(function () {
            if (this.deleteButton !== null) {
                this.deleteButton.className = 'button-link finished';
                this.deleteButton.removeAttribute('disabled');
                finishedFunction();
            }
        }, 1700);
    }

    static finishedDelete() {
        setTimeout(function () {
            if (this.deleteButton !== null) {
                this.deleteButton.className = 'button-link';
                this.deleteSpan.textContent = 'Delete';
            }
        }, 400);
    }

    onUpdateClick() {
        this.updateSpan.textContent = '';
        this.updateButton.className = 'button-link link-onclick';
        this.updateButton.setAttribute('disabled', 'disabled');
        ::this.loaderUpdate();
    }


    loaderUpdate() {
        setTimeout(function () {
            this.props.advertActions.updateAdvert(this.props.advert.id, ::this.setOkUpdate, ::this.setErrorUpdate);
        }.bind(this), 700);
    }


    setOkUpdate() {
        setTimeout(function () {
            this.updateButton.className = 'button-link updateOk';
            this.callbackUpdate(::this.finishedUpdate);
        }.bind(this), 1000);
    }


    setErrorUpdate() {
        setTimeout(function () {
            this.updateButton.className = 'button-link deleteError';
            this.callbackUpdate(::this.finishedUpdate);
        }.bind(this), 1000);
    }


    callbackUpdate(finishedFunction) {
        setTimeout(function () {
            this.updateButton.className = 'button-link finished';
            finishedFunction();
        }.bind(this), 1700);
    }


    finishedUpdate() {
        setTimeout(function () {
            this.updateButton.className = 'button-link';
            this.updateSpan.textContent = 'Update';
            this.updateButton.removeAttribute('disabled');
        }.bind(this), 400);
    }

    render() {
        let advertId = this.props.advert.id;
        let advertName = this.props.advert.name;
        let advertPicture = this.props.advert.picture;
        let advertLength = this.props.advert.length;
        let advertPrice = this.props.advert.currentPrice;
        let advertOpen = this.props.advert.dateOpen;
        let advertClosed = this.props.advert.dateClosed;
        let advertUpdated = this.props.advert.lastUpdate;
        let advertOldPrices = this.props.advert.oldPrices;
        let deleteConfirmation = this.props.deleteConfirmation;
        let selectedId = this.props.selectedId;
        return (
            <div className='advert'>
                <div className='advertName'>{advertName}</div>
                <div className='advertDateValues'>
                    <div>Added: {advertOpen}</div>
                    <div>Checked: {advertUpdated}</div>
                    {advertClosed ? <div> Closed: {advertClosed} </div> : null}
                </div>
                <div className='advertLinks'>
                    <button className='button-link' onClick={::this.onLinkClick}><span>To Blocket</span></button>
                    <button className='button-link' ref={button => this.updateButton = button}
                            onClick={::this.onUpdateClick}><span ref={span => this.updateSpan = span }>Update</span>
                    </button>
                    <button className='button-link' ref={button => this.deleteButton = button}
                            onClick={::this.onDeleteClick}><span ref={span => this.deleteSpan = span}>Delete</span>
                    </button>
                </div>
                <div className='advertData'>
                    <div className='advertTextData'>
                        <div className='advertLength'>{advertLength} ft</div>
                        {advertOldPrices.length > 0 ? <div className='advertLength'>{advertPrice} :-
                                <br/> was {advertOldPrices[advertOldPrices.length - 1]} :-</div> :
                            <div className='advertLength'>{advertPrice} :-</div> }
                    </div>
                    <div className='advertPicture'>
                        <Link to={'/adverts/' + advertId}>
                            <img src={advertPicture + '?' + Math.random()} width='100%' height='100%'/>
                        </Link>
                    </div>
                </div>
                <Modal
                    isOpen={deleteConfirmation && selectedId === advertId}
                    style={customStyles}
                    contentLabel='deleteConfirmationModal'
                >
                    <div className='confirmdelete'>
                        <h2 className='confirmHeader'>Are you sure you want <br/> do delete this advert?</h2>
                        <button className='button-link'
                                onClick={::this.onCancelDeleteClick}><span
                            ref={span => this.updateSpan = span }>Cancel</span>
                        </button>
                        <button className='button-link'
                                onClick={::this.onConfirmDeleteClick}><span
                            ref={span => this.deleteSpan = span}>Delete</span>
                        </button>
                    </div>
                </Modal>
            </div>
        )
    }
}

Advert.propTypes = {
    advert: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        link: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        dateOpen: React.PropTypes.string.isRequired,
        currentPrice: React.PropTypes.number.isRequired,
        length: React.PropTypes.number.isRequired,
        lastUpdate: React.PropTypes.string.isRequired,
        picture: React.PropTypes.string.isRequired,
        dateClosed: React.PropTypes.string
    }),
    deleteConfirmation: React.PropTypes.bool.isRequired,
    selectedId: React.PropTypes.number.isRequired,
    advertActions: React.PropTypes.shape({
        deleteAdvert: React.PropTypes.func.isRequired,
        updateAdvert: React.PropTypes.func.isRequired,
        showDeleteConfirmation: React.PropTypes.func.isRequired,
        closeDeleteConfirmation: React.PropTypes.func.isRequired
    })
};
