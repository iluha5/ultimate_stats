import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typography} from "@material-ui/core/es/index";

class Error extends Component {
    render() {
        return (
            <div style={{paddingTop: 10, paddingLeft: 10}}>
                Error...
            </div>
        );
    }
}

Error.propTypes = {};

export default Error;
