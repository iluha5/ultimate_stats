import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Bar from "./Bar";
import AppDrawer from "./AppDrawer";
import {withStyles} from "@material-ui/core/styles/index";
import Typography from '@material-ui/core/Typography';


class Scorekeeper extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                {/*<Bar />*/}
                <AppDrawer />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Typography paragraph>
                        привет, {this.props.user.name}
                    </Typography>
                </main>

            </div>
        );
    }
}

Scorekeeper.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});


const mapStateToProps = (state) => {
    return {
        user: state.user.userData
    }
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Scorekeeper));
