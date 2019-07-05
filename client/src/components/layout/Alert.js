import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alert = ({ alerts }) => 
    alerts !== null && alerts.length > 0 && alerts.map( alert=> (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            { alert.msg }
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

// we are mapping the redux state to a prop in this component (the array of alerts)
const mapStateToProps = state => ({
    // L: refer to the prop as 'alerts', R: what we want from root reducer
    alerts:  state.alert 
});

export default connect(mapStateToProps)(Alert);
