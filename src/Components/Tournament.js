import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppDrawer from './AppDrawer';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
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
});

class ScrollableTabsButtonForce extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppDrawer />
                <AppBar position="static" color="default" className={classes.tabs}>
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        scrollable
                        scrollButtons="off"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Игры"  />
                        <Tab label="Ростеры"  />
                        <Tab label="Статистика"  />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>Игры</TabContainer>}
                {value === 1 && <TabContainer>Ростеры</TabContainer>}
                {value === 2 && <TabContainer>Статистика</TabContainer>}
            </div>
        );
    }
}

ScrollableTabsButtonForce.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonForce);

// import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import {connect} from "react-redux";
// import AppDrawer from "./AppDrawer";
// import {withStyles} from "@material-ui/core/styles/index";
// import Typography from '@material-ui/core/Typography';
// import {DRAWER_WIDTH} from "../constants";
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
//
//
// function TabContainer(props) {
//     return (
//         <Typography component="div" style={{padding: 8 * 3}}>
//             {props.children}
//         </Typography>
//     );
// }
//
//
// class Tournament extends Component {
//     state = {
//         value: 0,
//     };
//
//     handleTabChange = (event, value) => {
//         this.setState({value: value});
//     };
//
//     render() {
//         const {classes, id} = this.props;
//         const value = this.state;
//
//         return (
//             <div className={classes.root}>
//                 {/*<AppDrawer/>*/}
//                 <AppBar position="static">
//                     <Tabs value={value} onChange={this.handleTabChange}>
//                         <Tab label="Item One"/>
//                         <Tab label="Item Two"/>
//                         <Tab label="Item Three"/>
//                     </Tabs>
//                 </AppBar>
//                 {value === 0 && <TabContainer>Item One</TabContainer>}
//                 {value === 1 && <TabContainer>Item Two</TabContainer>}
//                 {value === 2 && <TabContainer>Item Three</TabContainer>}
//             </div>
//
//             // <main className={classes.content}>
//             //     <div>{'Турнир: ' + id}</div>
//             // </main>
//
//         );
//     }
// }

// Tournament.propTypes = {
//     id: PropTypes.string.isRequired,
//     // children: PropTypes.node.isRequired,
//     //from store
//     user: PropTypes.object.isRequired,
//     tournamentsList: PropTypes.object,
//     //from withStyles
//     classes: PropTypes.object.isRequired,
// };

// const styles = theme => ({
//     root: {
//         flexGrow: 1,
//         backgroundColor: theme.palette.background.paper,
//         // display: 'flex',
//     },
//     toolbar: theme.mixins.toolbar,
//     content: {
//         flexGrow: 1,
//         paddingTop: 64,
//         // padding: theme.spacing.unit * 0,
//         [theme.breakpoints.up('md')]: {
//             width: `calc(100% - ${DRAWER_WIDTH}px)`,
//             marginLeft: DRAWER_WIDTH,
//         },
//
//     },
// });


// const mapStateToProps = (state) => {
//     return {
//         user: state.user.userData,
//         tournamentsList: state.tournamentsList.list,
//     }
// };
//
// const mapDispatchToProps = () => {
//     return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Tournament));
