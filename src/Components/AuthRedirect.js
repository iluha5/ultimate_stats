import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ADMIN, SCOREKEEPER} from "../constants";
import {goTo} from "../AC";

class AuthRedirect extends Component {
    render() {
        const {user, goTo} = this.props;
// debugger
//         console.log('-----SCOREKEEPER', SCOREKEEPER);
//         const sc = SCOREKEEPER;
        // debugger
        if (!user || !user.role || (user.role !== SCOREKEEPER && user.role !== ADMIN)) {
            goTo('/network');
            return (<></>);
        }

        return (
            <>
                {this.props.children}
            </>
        )
    }
}

AuthRedirect.propTypes = {};

const mapStateToProps = (state) => {
    return {
        user: state.user.userData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        goTo: (path) => dispatch(goTo(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect);