import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 700,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    mainList: {
        paddingLeft: 0
    }
});

class TournamentsList extends React.Component {
    state = {
        open: false,
    };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <List
                    className={classes.mainList}
                    component="nav"
                    subheader={<ListSubheader component="div">Список турниров</ListSubheader>}
                >
                    <ListItem button>
                        {/*<ListItemIcon>*/}
                            {/*<SendIcon />*/}
                        {/*</ListItemIcon>*/}
                        <ListItemText primary="Лорд Новгород 2018" />
                        <ListItemText secondary={'Игр: ' + 1} />
                        <ListItemText secondary={'Команд: ' + 12} />
                    </ListItem>
                    <ListItem button>
                        {/*<ListItemIcon>*/}
                            {/*<DraftsIcon />*/}
                        {/*</ListItemIcon>*/}
                        <ListItemText primary="Запуск 2018" />
                    </ListItem>
                    <ListItem button onClick={this.handleClick}>
                        {/*<ListItemIcon>*/}
                            {/*<InboxIcon />*/}
                        {/*</ListItemIcon>*/}
                        <ListItemText primary="Кубок Новгородской области 2018" />
                        <ListItemText secondary={'Игр: ' + 1} />
                        <ListItemText secondary={'Команд: ' + 12} />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                {/*<ListItemIcon>*/}
                                    {/*<StarBorder />*/}
                                {/*</ListItemIcon>*/}
                                <ListItemText primary="Статистика" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

TournamentsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TournamentsList);