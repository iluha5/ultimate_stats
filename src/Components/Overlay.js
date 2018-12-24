import React, {Component} from 'react';
import PropTypes from 'prop-types';

const overlay = {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 80,
    position: 'absolute',
    fontSize: 35,
    color: '#1769aa',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 100,
};


class Overlay extends Component {
    render() {
        const {message, index, alfa} = this.props;

        let style = {...overlay};
        style = index ? {...style, zIndex: index} : style;
        style = alfa ? {...style, backgroundColor: `rgba(255,255,255,${alfa})`} : style;

        return (
            <div style={style}><span>{message}</span></div>
        );
    }
}

Overlay.propTypes = {
    message: PropTypes.string,
    index: PropTypes.string,
    alfa: PropTypes.string,
};

export default Overlay;
