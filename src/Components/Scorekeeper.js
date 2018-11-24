import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class Scorekeeper extends Component {
    render() {
        return (
            <div>
                привет, {this.props.user.name}
            </div>
        );
    }
}

Scorekeeper.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user.userData
    }
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Scorekeeper);
