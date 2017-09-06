/**
 * Created by Ilya on 08.01.2017.
 */
import React, {PropTypes, Component} from 'react'
import AdvertController from './advertcontroller'
import AdvertFilter from './advertfilter'
import Advert from './advert'

export default class Adverts extends Component {

    render() {
        const {adverts, fetching, error, advertActions, sorting, sortingActions, deleteConfirmation, filteringActions, filtering} = this.props;

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
                <AdvertFilter sortingActions={sortingActions} sorting={sorting} filteringActions={filteringActions} filtering={filtering}/>

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