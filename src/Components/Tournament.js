import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppDrawer from './AppDrawer';
import TeamsList from "./TeamsList";
import {DRAWER_WIDTH} from "../constants";
import {connect} from "react-redux";
import Page404 from "./Page404";
import {loadTournamentsList} from "../AC";
import Loader from "./Loader";
import GamesList from "./GamesList";

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 0}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        paddingTop: 64,
    },
    content: {
        flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
        },
        paddingBottom: 50,
    }
});

class ScrollableTabsButtonForce extends React.Component {
    state = {
        value: 1,
    };

    componentDidMount() {
        const {loadTournamentsList, tournamentsList} = this.props;
        if (tournamentsList.shouldReload) {
            loadTournamentsList();
        }
    }

    componentDidUpdate() {
        const {loadTournamentsList, tournamentsList} = this.props;
        if (tournamentsList.shouldReload) {
            loadTournamentsList();
        }

    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    getBody() {
        const {classes, tournament, tournamentsList, id} = this.props;
        const {value} = this.state;
        // debugger
        if (tournamentsList.isLoading || tournamentsList.shouldReload) return <Loader />;

        if (tournament && tournament.name) {
            return (
                <div className={classes.content}>
                    <AppBar position="static" color="default" className={classes.tabs}>
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            scrollable
                            scrollButtons="off"
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Команды"/>
                            <Tab label="Игры"/>
                            <Tab label="Статистика"/>
                        </Tabs>
                    </AppBar>

                    {value === 0 &&
                    <TabContainer>
                        <TeamsList tournamentID={id}/>
                    </TabContainer>}
                    {value === 1 && <TabContainer>
                        <GamesList tournamentID={id}/>
                    </TabContainer>}
                    {value === 2 && <TabContainer>Статистика</TabContainer>}
                </div>
            )
        } else {
            return <Page404/>;
        }

    }

    render() {
        const {classes, tournament} = this.props;
        // const {value} = this.state;
        // debugger

        return (
            <div className={classes.root}>
                <AppDrawer title={(tournament && tournament.name) ? tournament.name : null}/>
                {this.getBody()}
            </div>
        );
    }
}

ScrollableTabsButtonForce.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    // from store
    tournament: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
    // debugger
    const {id} = ownProps;
    return {
        tournament: state.tournamentsList.list.get(id),
        tournamentsList: state.tournamentsList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTournamentsList: () => dispatch(loadTournamentsList())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScrollableTabsButtonForce));
