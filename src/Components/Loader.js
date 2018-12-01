import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typography} from "@material-ui/core/es/index";

class Loader extends Component {
    render() {
        return (
            <div style={{paddingTop: 80, paddingLeft: 40}}>
                Loading...
            </div>
        );
    }
}

Loader.propTypes = {};

export default Loader;
