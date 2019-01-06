import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import AppDrawer from "./AppDrawer";
import {withStyles} from "@material-ui/core/styles/index";
import TournamentsList from "./TournamentsList";
import {DRAWER_WIDTH} from "../constants";


class Scorekeeper extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <AppDrawer title={'Панель скоркипера'} />
                <main className={classes.content}>
                    <TournamentsList />
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
        // padding: theme.spacing.unit * 0,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
        },

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
