import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({loaded}) => (loaded ? <div className="spinner"><span className="helper"></span><img src="./ajax_loader.gif"/></div> : <div></div>);

Spinner.propTypes = {
    loaded : PropTypes.bool
};

export default Spinner;