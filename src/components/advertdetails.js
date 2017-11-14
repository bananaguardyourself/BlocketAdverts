/**
 * Created by Ilya on 21.08.2017.
 */
import React, { Component } from 'react'
import Modal from 'react-modal'
import Photos from './photos'
import PropTypes from 'prop-types';

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

export default class AdvertDetails extends Component {

    componentWillMount() {
        let advertId = this.props.params.id;
        const { getAdvert } = this.props.advertdetailsactions;
        getAdvert(advertId);
    }

    onLinkClick() {
        window.open(this.props.advert.link, '_blank');
    }

    onCancelDeleteClick() {
        this.props.advertactions.closeDeleteConfirmation();
        this.deleteButton.removeAttribute('disabled');
    }

    onDeleteClick() {
        this.props.advertactions.showDeleteConfirmation();
    }

    onConfirmDeleteClick() {
        this.props.advertactions.closeDeleteConfirmation();
        this.props.advertactions.deleteAdvert(this.props.advert.id, this.loaderDelete);
        this.deleteButton.setAttribute('disabled', 'disabled');
    }

    static loaderDelete() {
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
            this.props.advertactions.updateAdvert(this.props.advert.id, ::this.setOkUpdate, ::this.setErrorUpdate);
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

        let advertName = this.props.advert.name;
        let advertOpen = this.props.advert.dateOpen;
        let advertClosed = this.props.advert.dateClosed;
        let advertUpdated = this.props.advert.lastUpdate;
        let advertPictures = this.props.advert.pictures;
        let advertLength = this.props.advert.length;
        let advertPrice = this.props.advert.currentPrice;
        let advertDescription = this.props.advert.description;
        let deleteConfirmation = this.props.advert.deleteConfirmation;
        let deleted = this.props.advert.deleted;

        return (
            <div className='bodyPane'>
                {deleted ?
                    <div className='advert'>
                        <div className='advertName'>{advertName}</div>
                        <div className='detailsMain'>
                            <div className='detailsLength'>{advertLength} ft</div>
                            <div className='detailsLength'>{advertPrice} :-</div>
                            <div className='detailsDateValues'>
                                <div>Added: {advertOpen} Checked: {advertUpdated} {advertClosed ?
                                    <span> Closed: {advertClosed} </span> : null}</div>
                            </div>
                        </div>
                        <h1>DELETED</h1>
                    </div>
                    :
                    <div className='advert'>
                        <div className='advertName'>{advertName}</div>
                        <div className='detailsMain'>
                            <div className='detailsLength'>{advertLength} ft</div>
                            <div className='detailsLength'>{advertPrice} :-</div>
                            <div className='detailsDateValues'>
                                <div>Added: {advertOpen} </div>
                                <div>Checked: {advertUpdated} </div>
                                {advertClosed ?
                                    <div> Closed: {advertClosed} </div> : null}
                            </div>
                        </div>
                        <Photos pictures={advertPictures} />
                        <div>
                            {advertDescription}
                        </div>
                        <div className='detailsButtons'>
                            <button className='button-link' onClick={::this.onLinkClick}><span>To Blocket</span>
                            </button>
                        <button className='button-link' ref={button => this.updateButton = button}
                            onClick={::this.onUpdateClick}><span
                                ref={span => this.updateSpan = span}>Update</span>
                            </button>
                    <button className='button-link' ref={button => this.deleteButton = button}
                        onClick={::this.onDeleteClick}><span
                            ref={span => this.deleteSpan = span}>Delete</span>
                            </button>
                        </div >
                    </div >
                }
                <Modal
    isOpen={deleteConfirmation}
    style={customStyles}
    contentLabel='deleteConfirmationModal'
>
    <div className='confirmdelete'>
        <h2 className='confirmHeader'>Are you sure you want <br /> do delete this advert?</h2>
        <button className='button-link'
            onClick={::this.onCancelDeleteClick}><span
                ref={span => this.updateSpan = span}>Cancel</span>
                        </button>
    <button className='button-link'
        onClick={::this.onConfirmDeleteClick}><span
            ref={span => this.deleteSpan = span}>Delete</span>
                        </button>
                    </div >
                </Modal >
            </div >
        )
    }
}

AdvertDetails.propTypes = {
    advert: PropTypes.shape({
        id: PropTypes.number.isRequired,
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        dateOpen: PropTypes.string.isRequired,
        currentPrice: PropTypes.number.isRequired,
        length: PropTypes.number.isRequired,
        lastUpdate: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        description: PropTypes.string,
        dateClosed: PropTypes.string,
        pictures: PropTypes.array,
        deleteConfirmation: PropTypes.bool.isRequired
    }),
    advertdetailsactions: PropTypes.shape({
        getAdvert: PropTypes.func.isRequired,
    }),
    advertactions: PropTypes.shape({
        deleteAdvert: PropTypes.func.isRequired,
        updateAdvert: PropTypes.func.isRequired,
        showDeleteConfirmation: PropTypes.func.isRequired,
        closeDeleteConfirmation: PropTypes.func.isRequired
    })
};