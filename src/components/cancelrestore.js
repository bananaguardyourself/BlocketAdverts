/**
 * Created by Ilya on 23.11.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CancelRestore extends Component {
    componentWillMount() {
        let userCode = this.props.params.code;
        const { cancelRestore } = this.props;
        cancelRestore(userCode);
    }

    render() {
        const { error } = this.props.user;

        return (
            <div className='bodyPane'>
                {error.length > 0 ?
                    <h2>{error}</h2> : <h2>Password change canceled</h2>}
            </div>
        );
    }
}

CancelRestore.propTypes = {
    user: PropTypes.shape({
        error: PropTypes.string.isRequired
    }),
    cancelRestore: PropTypes.func.isRequired
};