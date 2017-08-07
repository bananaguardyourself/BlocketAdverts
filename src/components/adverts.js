/**
 * Created by Ilya on 08.01.2017.
 */
import React, {PropTypes, Component} from 'react'
import AdvertController from './advertcontroller'
import AdvertFilter from './advertfilter'
import Modal from 'react-modal'

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

let Advert = React.createClass({
    propTypes: {
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
        advertActions: React.PropTypes.shape({
            deleteAdvert: React.PropTypes.func.isRequired,
            updateAdvert: React.PropTypes.func.isRequired,
            showDeleteConfirmation: React.PropTypes.func.isRequired,
            closeDeleteConfirmation: React.PropTypes.func.isRequired
        })
    },

    onLinkClick: function () {
        window.open(this.props.advert.link, '_blank');
    },

    onCancelDeleteClick: function () {
        this.props.advertActions.closeDeleteConfirmation();
        this.deleteButton.removeAttribute('disabled');
    },

    onDeleteClick: function () {
        this.props.advertActions.showDeleteConfirmation();
    },

    onConfirmDeleteClick: function () {
        this.props.advertActions.closeDeleteConfirmation();
        this.props.advertActions.deleteAdvert(this.props.advert.id, this.loaderDelete);
        this.deleteButton.setAttribute('disabled', 'disabled');
    },

    loaderDelete: function () {
        setTimeout(function () {
            if (this.deleteSpan !== null) {
                this.deleteSpan.textContent = '';
                this.deleteButton.className = 'button-link link-onclick';
                this.setErrorDelete(this.callbackDelete)
            }
        }.bind(this), 500);
    },

    setErrorDelete: function (callbackFunction) {
        setTimeout(function () {
            if (this.deleteButton !== null) {
                this.deleteButton.className = 'button-link deleteError';
                callbackFunction(this.finishedDelete);
            }
        }.bind(this), 1000);
    },

    callbackDelete: function (finishedFunction) {
        setTimeout(function () {
            if (this.deleteButton !== null) {
                this.deleteButton.className = 'button-link finished';
                this.deleteButton.removeAttribute('disabled');
                finishedFunction();
            }
        }.bind(this), 1700);
    },

    finishedDelete: function () {
        setTimeout(function () {
            if (this.deleteButton !== null) {
                this.deleteButton.className = 'button-link';
                this.deleteSpan.textContent = 'Delete';
            }
        }.bind(this), 400);
    },

    onUpdateClick: function () {
        this.updateSpan.textContent = '';
        this.updateButton.className = 'button-link link-onclick';
        this.updateButton.setAttribute('disabled', 'disabled');
        this.loaderUpdate();
    },

    loaderUpdate: function () {
        setTimeout(function () {
            this.props.advertActions.updateAdvert(this.props.advert.id, this.setOkUpdate, this.setErrorUpdate);
        }.bind(this), 700);
    },

    setOkUpdate: function () {
        setTimeout(function () {
            this.updateButton.className = 'button-link updateOk';
            this.callbackUpdate(this.finishedUpdate);
        }.bind(this), 1000);
    },

    setErrorUpdate: function () {
        setTimeout(function () {
            this.updateButton.className = 'button-link deleteError';
            this.callbackUpdate(this.finishedUpdate);
        }.bind(this), 1000);
    },

    callbackUpdate: function (finishedFunction) {
        setTimeout(function () {
            this.updateButton.className = 'button-link finished';
            finishedFunction();
        }.bind(this), 1700);
    },

    finishedUpdate: function () {
        setTimeout(function () {
            this.updateButton.className = 'button-link';
            this.updateSpan.textContent = 'Update';
            this.updateButton.removeAttribute('disabled');
        }.bind(this), 400);
    },

    render: function () {
        let advertName = this.props.advert.name;
        let advertPicture = this.props.advert.picture;
        let advertLength = this.props.advert.length;
        let advertPrice = this.props.advert.currentPrice;
        let advertOpen = this.props.advert.dateOpen;
        let advertClosed = this.props.advert.dateClosed;
        let advertUpdated = this.props.advert.lastUpdate;
        let advertOldPrices = this.props.advert.oldPrices;
        let deleteConfirmation = this.props.deleteConfirmation;

        return (
            <div className='advert'>
                <div className='advertName'>{advertName}</div>
                <div className='advertDateValues'>
                    <div>Added: {advertOpen}</div>
                    <div>Checked: {advertUpdated}</div>
                    {advertClosed ? <div> Closed: {advertClosed} </div> : null}
                </div>
                <div className='advertLinks'>
                    <button className='button-link' onClick={this.onLinkClick}><span>To Blocket</span></button>
                    <button className='button-link' ref={button => this.updateButton = button}
                            onClick={this.onUpdateClick}><span ref={span => this.updateSpan = span }>Update</span>
                    </button>
                    <button className='button-link' ref={button => this.deleteButton = button}
                            onClick={this.onDeleteClick}><span ref={span => this.deleteSpan = span}>Delete</span>
                    </button>
                </div>
                <div className='advertData'>
                    <div className='advertTextData'>
                        <div className='advertLength'>{advertLength} ft</div>
                        {advertOldPrices.length > 0 ? <div className='advertLength'>{advertPrice} :-
                                - Previous price({advertOldPrices[advertOldPrices.length - 1]} :-)</div> :
                            <div className='advertLength'>{advertPrice} :-</div> }
                    </div>
                    <div className='advertPicture'>
                        <img src={advertPicture + '?' + Math.random()} width='100%' height='100%'/>
                    </div>
                </div>
                <Modal
                    isOpen={deleteConfirmation}
                    style={customStyles}
                    contentLabel='deleteConfirmationModal'
                >
                    <div className='confirmdelete'>
                        <h2 className='confirmHeader'>Are you sure you want <br/> do delete this advert?</h2>
                        <button className='button-link'
                                onClick={this.onCancelDeleteClick}><span
                            ref={span => this.updateSpan = span }>Cancel</span>
                        </button>
                        <button className='button-link'
                                onClick={this.onConfirmDeleteClick}><span
                            ref={span => this.deleteSpan = span}>Delete</span>
                        </button>
                    </div>
                </Modal>
            </div>
        )
    }
});

export default class Adverts extends Component {

    render() {
        const {adverts, fetching, error, advertActions, sorting, sortingActions, deleteConfirmation} = this.props;

        let newsTemplate;

        if (adverts.length > 0) {
            newsTemplate = adverts.map(function (item) {
                return (
                    <div key={item.id}>
                        <Advert advert={item} deleteConfirmation={deleteConfirmation} advertActions={advertActions}/>
                    </div>
                )
            })
        } else {
            newsTemplate = <p>No adverts</p>
        }

        return (
            <div className='bodyPane'>
                {
                    fetching ?
                        <p>Loading...</p>
                        :
                        <p style={{height: '17px'}}/>
                }

                {error.length > 0 ?
                    <p>{error}</p> : null}

                <AdvertController actions={advertActions}/>
                <AdvertFilter sortingActions={sortingActions} sorting={sorting}/>

                {newsTemplate}

            </div>
        );
    }
}

Adverts.propTypes = {
    error: PropTypes.string.isRequired,
    adverts: PropTypes.array.isRequired,
    advertActions: PropTypes.object,
    sorting: PropTypes.object,
    sortingActions: PropTypes.object,
    deleteConfirmation: PropTypes.bool.isRequired
};