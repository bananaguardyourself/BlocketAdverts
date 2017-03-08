/**
 * Created by Ilya on 08.01.2017.
 */
import React, {PropTypes, Component} from 'react'
import AdvertController from './advertcontroller'

var Advert = React.createClass({
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

    render: function () {
        let advertName = this.props.advert.name;
        let advertPicture = this.props.advert.picture;
        let advertLength = this.props.advert.length;
        let advertPrice = this.props.advert.currentPrice;
        let advertOpen = this.props.advert.dateOpen;
        let advertClosed = this.props.advert.dateClosed;
        let advertUpdated = this.props.advert.lastUpdate;
        let advertOldPrices = this.props.advert.oldPrices;
        let advertLink = this.props.advert.link;
        return (
            <div className='advert'>
                <div className='advertName'>{advertName}</div>
                <div className='advertDateValues'>
                    <div>Added: {advertOpen}</div>
                    <div>Last checked: {advertUpdated}</div>
                    {advertClosed ? <div> Closed: {advertClosed} </div> : null}
                </div>
                <div className='advertLinks'>
                    <a href={advertLink}>Check advert on Blocket.se</a>
                </div>
                <div className='advertData'>
                    <div className='advertTextData'>
                        <div className='advertLength'>{advertLength} ft</div>
                        {advertOldPrices.length > 0 ? <div className='advertLength'>{advertPrice} :-
                            - Previous price({advertOldPrices[advertOldPrices.length - 1]} :-)</div> :
                            <div className='advertLength'>{advertPrice} :-</div> }
                    </div>
                    <div className='advertPicture'>
                        <img src={advertPicture} width='90px' height='60px'/>
                    </div>
                </div>
            </div>
        )
    }
});

export default class Adverts extends Component {

    render() {
        const {adverts, fetching, error} = this.props;

        let newsTemplate;

        if (adverts.length > 0) {
            newsTemplate = adverts.map(function (item) {
                return (
                    <div key={item.id}>
                        <Advert advert={item}/>
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
                        <p>Загрузка...</p>
                        :
                        null
                }

                {error.length > 0 ?
                    <p>{error}</p> : null}

                <AdvertController actions = {this.props.advertActions}/>

                {newsTemplate}

            </div>
        );
    }
}

Adverts.propTypes = {
    error: PropTypes.string.isRequired,
    adverts: PropTypes.array.isRequired,
    advertActions: PropTypes.object
};