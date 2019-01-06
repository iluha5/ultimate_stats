import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
// import {MuiPickersUtilsProvider} from 'material-ui-pickers';
// import {DatePicker} from 'material-ui-pickers';
// import DateFnsUtils from '@date-io/date-fns';
// import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import ruLocale from 'date-fns/locale/ru';
// import FormControl from '@material-ui/core/FormControl';
import {withStyles} from '@material-ui/core/styles';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Chip from '@material-ui/core/Chip';
// import Input from '@material-ui/core/Input';
import {connect} from "react-redux";
import {pushNewTeam, updateTournament} from "../AC";
// import dateFormat from 'dateformat';
import uuidv4 from "uuid/v4";

const defaultState = {
    name: '',
};


class AddTeam extends React.Component {
    state = {
        selectedDateFrom: new Date(),
        selectedDateTo: new Date(),
        cover: '',
        divisions: [],
        name: '',
        country: '',
        place: '',
        covering: '',
        format: '',
        isNameError: false,
        nameHelper: ' ',
        dateToHelper: ' ',
    };

    getDateHelper = (dateFrom = this.state.selectedDateFrom, dateTo = this.state.selectedDateTo) => {
        if (dateFrom > dateTo) {
            return 'Должна быть не меньше даты начала';
        }

        return ' ';
    };

    // handleDateFromChange = (date) => {
    //     this.setState({
    //         selectedDateFrom: date,
    //         dateToHelper: this.getDateHelper(date)
    //     });
    // };
    //
    // handleDateToChange = (date) => {
    //     this.setState({
    //         selectedDateTo: date,
    //         dateToHelper: this.getDateHelper(null,date)
    //     });
    // };
    //
    // handleCovering = event => {
    //     this.setState({[event.target.name]: event.target.value});
    // };
    //
    // handleChange = event => {
    //     this.setState({divisions: event.target.value});
    // };

    handleAddTeam = () => {
        const {name} = this.state;
        const {toggleClose, pushNewTeam, updateTournament, tournament} = this.props;

        let nameError = false;
        if (!name || name.length < 2) nameError = true;

        if (nameError){
            this.setState({
                isNameError: nameError,
            });
            return;
        }

        const newID = uuidv4();

        pushNewTeam({
            id: newID,
            name,
        });

        // debugger
        updateTournament(tournament.set('teamsList', [...tournament.teamsList, newID]));

        toggleClose();

        this.setState(defaultState);
    };

    // getStyles(name, that) {
    //     return {
    //         fontWeight:
    //             that.state.divisions.indexOf(name) === -1
    //                 ? that.props.theme.typography.fontWeightRegular
    //                 : that.props.theme.typography.fontWeightMedium,
    //     };
    // }

    handleFieldChange = event => {
        if (event.target.value.length < 2 && event.target.id === 'name') {
            this.setState({
                [event.target.id]: event.target.value,
                isNameError: true,
                nameHelper: 'Не менее 2-х символов'
            });
            return;
        }

        this.setState({
            [event.target.id]: event.target.value,
            isNameError: false,
            nameHelper: ' ',
        });
    };

    render() {
        const {isOpen, toggleClose, classes} = this.props;
        const {name, isNameError, nameHelper} = this.state;

        // const names = [
        //     'Открытый',
        //     'Женский',
        //     'Смешанный',
        //     'Шляпа',
        //     'Открытый Мастерс',
        //     'Женский Мастерс',
        //     'Открытый Юниоры',
        //     'Женский Юниоры',
        //     'Другое',
        // ];

        // const ITEM_HEIGHT = 48;
        // const ITEM_PADDING_TOP = 8;
        // const MenuProps = {
        //     PaperProps: {
        //         style: {
        //             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        //             width: 250,
        //         },
        //     },
        // };

        return (
            <div>
                {/*<Button onClick={this.handleClickOpen}>Open form dialog</Button>*/}
                <form className={classes.root} autoComplete="off">
                    <Dialog
                        open={isOpen}
                        scroll = 'body'
                        // onClose={toggleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Добавление команды</DialogTitle>
                        <DialogContent>
                            <TextField
                                value={name}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Название"
                                type="name"
                                fullWidth
                                required
                                onChange={this.handleFieldChange}
                                error={isNameError}
                                helperText={nameHelper}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={toggleClose} color="primary">
                                Отмена
                            </Button>
                            <Button onClick={this.handleAddTeam} color="primary">
                                Добавить
                            </Button>
                        </DialogActions>
                    </Dialog>
                </form>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    covering: {
        // margin: theme.spacing.unit,
        minWidth: 230,
        marginTop: 8
    },
    divisions: {
        minWidth: 230,
        marginTop: 8
    },
    format: {
        minWidth: 230,
        marginTop: 8
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
});

AddTeam.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleClose: PropTypes.func.isRequired,
    tournamentID: PropTypes.string.isRequired,
    //from store
    pushNewTeam: PropTypes.func,
    updateTournament: PropTypes.func,
    user: PropTypes.object,
};
const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        tournament: state.tournamentsList.list.get(ownProps.tournamentID)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        pushNewTeam: (team) => dispatch(pushNewTeam(team)),
        updateTournament: (tournament) => dispatch(updateTournament(tournament))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(AddTeam));

// export default withStyles(styles, {withTheme: true})(AddTournament);