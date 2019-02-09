import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutline from '@material-ui/icons/PauseCircleOutline';
import StopOutlined from '@material-ui/icons/StopOutlined';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import FiberSmartRecord from '@material-ui/icons/FiberSmartRecord';
import {connect} from "react-redux";
import {goTo, logout} from "../AC";
import {DRAWER_WIDTH} from "../constants";


// const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    title: {
        lineHeight: '1.5em',
        verticalAlign: 'middle',
        paddingTop: 0,
        textAlign: 'left'
    },
    timer: {
        // color: '#ff5d00'
    },
    controls: {
        padding: 0,
        paddingLeft: 5
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: DRAWER_WIDTH,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
        },
        [theme.breakpoints.down('sm')]: {
            // minHeight: 0
        }
    },
    // !!!!!!!!!! toolbar height here
    toolBar: {
        paddingLeft: 4,
        paddingRight: 4,
        // minHeight: 0
    },
    menuButton: {
        marginRight: 0,
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: 4,
            paddingBottom: 4
        }
    },
    rightMenuWrapper: {
        flexGrow: '1',
        justifyContent: 'flex-end',
        display: 'flex',
    },
    rightMenuButton: {
        [theme.breakpoints.down('sm')]: {
            paddingTop: 4,
            paddingBottom: 4
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: DRAWER_WIDTH,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        alignItems: 'center'
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 5
    },
    name: {
        textAlign: 'center',
        border: 0,
        color: '#f44336',
        paddingLeft: 5,
        paddingRight: 5
    },
    uploadNotNeeded: {
        color: '#0aff68',
        [theme.breakpoints.down('sm')]: {
            paddingTop: 4,
            paddingBottom: 4
        }
    },
    uploadNeeded: {
        color: '#f44336',
        [theme.breakpoints.down('sm')]: {
            paddingTop: 4,
            paddingBottom: 4
        }
    },
    uploadingInProgress: {
        color: '#ffbc00',
        [theme.breakpoints.down('sm')]: {
            paddingTop: 4,
            paddingBottom: 4
        }
    }
});

class AppDrawer extends React.Component {
    state = {
        mobileOpen: false,
        anchorEl: null,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleForceUpdate = (forceUpdateFromServer) => () => {
        this.setState({anchorEl: null});
        forceUpdateFromServer();
    };

    handleSaveGame = (saveGame) => () => {
        this.setState({anchorEl: null});
        saveGame();
    };

    render() {
        const {
            classes, theme, goTo, user, title, isGame, toggleTimer, handlerStop, isTimerOn, forceUpdateFromServer,
            uploadingStatus, logout, handlerForceUploadGame, forceEraseGame, saveGame
        } = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);


        const drawer = (
            <div>
                <List>
                    {['Главная'].map((text, index) => (
                        <ListItem button key={text} onClick={() => goTo('/')}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                </List>
            </div>
        );
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolBar} style={isGame ? {minHeight: 32} : null}>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="subtitle1" color="inherit" className={classes.title}>
                            {!isGame && title}
                            {isGame &&
                            (
                                <span>
                                    <span className={classes.timer}>
                                        {title}
                                    </span>
                                    < IconButton
                                        aria-haspopup="false"
                                        color="inherit"
                                        className={classes.controls}
                                        onClick={toggleTimer}
                                    >
                                        {isTimerOn ? <PauseCircleOutline/> : <PlayCircleOutline/>}
                                    </IconButton>
                                        < IconButton
                                            aria-haspopup="false"
                                            color="inherit"
                                            className={classes.controls}
                                            onClick={handlerStop}
                                        >
                                            <StopOutlined/>
                                        </IconButton>
                                </span>
                            )
                            }
                        </Typography>
                        {(
                            <div className={classes.rightMenuWrapper}>
                                {isGame && !uploadingStatus && (
                                    <IconButton
                                        onClick={handlerForceUploadGame}
                                        className={classes.uploadNotNeeded}
                                    >
                                        <FiberManualRecord/>
                                    </IconButton>
                                )}

                                {isGame && uploadingStatus && (
                                    <IconButton
                                        onClick={handlerForceUploadGame}
                                        className={classes.uploadingInProgress}
                                    >
                                        <FiberSmartRecord/>
                                    </IconButton>
                                )}

                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                    className={classes.rightMenuButton}
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >

                                    <Typography
                                        variant={"subtitle2"}
                                        color={"inherit"}
                                        gutterBottom
                                        style={{
                                            textAlign: 'center',
                                            border: 0,
                                            color: '#f44336',
                                            paddingLeft: 5,
                                            paddingRight: 5
                                        }}
                                        className={classes.name}
                                    >
                                        {user.name}
                                    </Typography>

                                    {isGame && <MenuItem onClick={this.handleForceUpdate(forceUpdateFromServer)} >Загрузить с сервера</MenuItem>}
                                    {isGame && <MenuItem onClick={this.handleForceUpdate(forceEraseGame)}>Начать игру заново</MenuItem>}
                                    {isGame && <MenuItem onClick={this.handleSaveGame(saveGame)}>Выгрузить игру</MenuItem>}
                                    <MenuItem onClick={logout}>Выйти</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                {/*</div>*/}
                <nav className={classes.drawer}>
                    {/* The implementation can be swap with js to avoid SEO duplication of links. */}
                    <Hidden mdUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
            </div>
        );
    }
}

AppDrawer.propTypes = {
    user: PropTypes.object.isRequired,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    isGame: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    toggleTimer: PropTypes.func,
    handlerStop: PropTypes.func,
    forceUpdateFromServer: PropTypes.func,
    handlerForceUploadGame: PropTypes.func,
    forceEraseGame: PropTypes.func,
    saveGame: PropTypes.func,
    logout: PropTypes.func,
    isTimerOn: PropTypes.bool,
    uploadingStatus: PropTypes.bool,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
    return {
        user: state.user.userData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        goTo: (path) => dispatch(goTo(path)),
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(AppDrawer));
