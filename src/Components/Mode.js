import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";

class Mode extends Component {
    render() {
        const {classes} = this.props;

        return (
            <div>
                <form className={classes.container} noValidate autoComplete="off">
                    <Link to="/network" style={{textDecoration: 'none'}}>
                        <Button variant="outlined" className={classes.button} size="large">
                            Сетевой режим
                        </Button>
                    </Link>
                    {/*<Link to="/local" style={{textDecoration: 'none'}}>*/}
                    <Button variant="outlined" disabled className={classes.button} size="large">
                        Локальный режим
                    </Button>
                    {/*</Link>*/}
                </form>
            </div>
        );
    }
}

Mode.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20%',
    },
    button: {
        margin: theme.spacing.unit,
        width: 280,
    },
});


export default withStyles(styles)(Mode);
