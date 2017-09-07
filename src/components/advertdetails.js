/**
 * Created by Ilya on 21.08.2017.
 */
import React, {Component} from 'react'
import Photos from './photos'

export default class AdvertDetails extends Component {

    componentWillMount() {
        let advertId = this.props.params.id;
        const {getAdvert} = this.props.advertdetailsactions;
        getAdvert(advertId);
    }

    onLinkClick() {
        window.open(this.props.advert.link, '_blank');
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

        let advertName = this.props.advert.name;
        let advertOpen = this.props.advert.dateOpen;
        let advertClosed = this.props.advert.dateClosed;
        let advertUpdated = this.props.advert.lastUpdate;
        let advertPictures = this.props.advert.pictures;
        return (
            <div className='advert'>
                <div className='advertName'>{advertName}</div>
                <Photos pictures={advertPictures}/>
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
                </div>
            </div>
        )
    }
}

AdvertDetails.propTypes = {
    advert: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        link: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        dateOpen: React.PropTypes.string.isRequired,
        currentPrice: React.PropTypes.number.isRequired,
        length: React.PropTypes.number.isRequired,
        lastUpdate: React.PropTypes.string.isRequired,
        picture: React.PropTypes.string.isRequired,
        dateClosed: React.PropTypes.string,
        pictures: React.PropTypes.array
    }),
    advertdetailsactions: React.PropTypes.shape({
        getAdvert: React.PropTypes.func.isRequired
    })
};
