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
import Test from "./Test";
import {connect} from "react-redux";

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
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
    }
});

class ScrollableTabsButtonForce extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes, tournament} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.root}>
                <AppDrawer title={tournament.name}/>
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
                        <Typography>
                            Список команд
                        </Typography>
                        <TeamsList/>
                    </TabContainer>}
                    {value === 1 && <TabContainer>
                        Игры
                        <Test />
                    </TabContainer>}
                    {value === 2 && <TabContainer>Статистика</TabContainer>}
                </div>
            </div>
        );
    }
}

ScrollableTabsButtonForce.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    // from store
    tournament: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps;
    return {
        tournament: state.tournamentsList.list.get(id)
    };
};

const mapDispatchToProps = () => {
    return {};
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScrollableTabsButtonForce));
