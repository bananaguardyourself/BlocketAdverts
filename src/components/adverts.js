/**
 * Created by Ilya on 08.01.2017.
 */
import React, {PropTypes, Component} from 'react'
import AdvertController from './advertcontroller'

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
        })
    },

    onLinkClick: function () {
        window.open(this.props.advert.link, '_blank');
    },

    onDeleteClick: function () {
        this.props.advertActions.deleteAdvert(this.props.advert.id);
        this.deleteButton.setAttribute('disabled', 'disabled');
        this.loader(this.setError);
    },

    loader: function (setErrorFunction) {
        setTimeout(function () {
            if (this.deleteSpan !== null) {
                this.deleteSpan.textContent = '';
                this.deleteButton.className = 'button-link link-onclick';
                setErrorFunction(this.callback)
            }
        }.bind(this), 500);
    },

    setError: function (callbackFunction) {
        setTimeout(function () {
            if (this.deleteButton !== null) {
                this.deleteButton.className = 'button-link deleteError';
                callbackFunction(this.finished)
            }
        }.bind(this), 1000);
    },

    callback: function (finishedFunction) {
        setTimeout(function () {
            if (this.deleteButton !== null) {
                this.deleteButton.className = 'button-link finished';
                this.deleteButton.removeAttribute('disabled');
                finishedFunction();
            }
        }.bind(this), 1700);
    },

    finished: function () {
        setTimeout(function () {
            if (this.deleteButton !== null) {
                this.deleteButton.className = 'button-link';
                this.deleteSpan.textContent = 'Delete';
            }
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

        return (
            <div className='advert'>
                <div className='advertName'>{advertName}</div>
                <div className='advertDateValues'>
                    <div>Added: {advertOpen}</div>
                    <div>Last checked: {advertUpdated}</div>
                    {advertClosed ? <div> Closed: {advertClosed} </div> : null}
                </div>
                <div className='advertLinks'>
                    <button className='button-link' onClick={this.onLinkClick}><span>To Blocket.se</span></button>
                    <button className='button-link'><span>Update</span></button>
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
                        <img src={advertPicture} width='100%' height='100%'/>
                    </div>
                </div>
            </div>
        )
    }
});

export default class Adverts extends Component {

    render() {
        const {adverts, fetching, error, advertActions} = this.props;

        let newsTemplate;

        if (adverts.length > 0) {
            newsTemplate = adverts.map(function (item) {
                return (
                    <div key={item.id}>
                        <Advert advert={item} advertActions={advertActions}/>
                    </div>
                )
            })
        } else {
            newsTemplate = <p>No advets</p>
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

                {newsTemplate}

            </div>
        );
    }
}

Adverts.propTypes = {
    error: PropTypes.string.isRequired,
    adverts: PropTypes.array.isRequired,
    advertActions: PropTypes.object,
    deleteError: PropTypes.bool.isRequired
};