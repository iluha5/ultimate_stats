import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typography} from "@material-ui/core/es/index";

class Page404 extends Component {
    render() {
        return (
            <Typography style={{paddingTop: 74, paddingLeft: 24}}>
                Page not found.
            </Typography>
        );
    }
}

Page404.propTypes = {};

export default Page404;
