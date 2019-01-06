import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import {DatePicker} from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ruLocale from 'date-fns/locale/ru';
import FormControl from '@material-ui/core/FormControl';
import {withStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import {connect} from "react-redux";
import {pushNewTournament} from "../AC";
import dateFormat from 'dateformat';

const defaultState = {
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


class AddTournament extends React.Component {
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

    // handleClickOpen = () => {
    //     this.setState({open: true});
    // };

    // handleClose = () => {
    //     this.setState({open: false});
    // };

    getDateHelper = (dateFrom = this.state.selectedDateFrom, dateTo = this.state.selectedDateTo) => {
        if (dateFrom > dateTo) {
                return 'Должна быть не меньше даты начала';
        }

        return ' ';
    };

    handleDateFromChange = (date) => {
        this.setState({
            selectedDateFrom: date,
            dateToHelper: this.getDateHelper(date)
        });
    };

    handleDateToChange = (date) => {
        this.setState({
            selectedDateTo: date,
            dateToHelper: this.getDateHelper(null,date)
        });
    };

    handleCovering = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleChange = event => {
        this.setState({divisions: event.target.value});
    };

    handleAddTournament = evt => {
        const {selectedDateFrom, selectedDateTo, country, place, covering, format, divisions, name, dateToHelper} = this.state;
        const {toggleClose, pushNewTournament, user} = this.props;

        let nameError = false;
        if (!name || name.length < 2) nameError = true;

        if (nameError){
            this.setState({
                isNameError: nameError,
            });
            return;
        }

        if (dateToHelper !== ' '){
            return;
        }

        pushNewTournament({
            id: '',
            name,
            country,
            place,
            dateStart: dateFormat(selectedDateFrom, 'd-mm-yyyy'),
            dateEnd: dateFormat(selectedDateTo, 'd-mm-yyyy'),
            covering,
            format,
            games: 0,
            teams: 0,
            divisions,
            ownerID: user.id
        });

        toggleClose();

        this.setState(defaultState);
    };

    getStyles(name, that) {
        return {
            fontWeight:
                that.state.divisions.indexOf(name) === -1
                    ? that.props.theme.typography.fontWeightRegular
                    : that.props.theme.typography.fontWeightMedium,
        };
    }

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
        const {selectedDateFrom, selectedDateTo, country, place, covering, format, divisions, name, isNameError, nameHelper, dateToHelper} = this.state;

        const names = [
            'Открытый',
            'Женский',
            'Смешанный',
            'Шляпа',
            'Открытый Мастерс',
            'Женский Мастерс',
            'Открытый Юниоры',
            'Женский Юниоры',
            'Другое',
        ];

        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };

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
                        <DialogTitle id="form-dialog-title">Добавление турнира</DialogTitle>
                        <DialogContent>
                            {/*<DialogContentText>*/}
                            {/*Все поля кроме Название - необязательные, но очень рекомендуемые :)*/}
                            {/*</DialogContentText>*/}

                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                <DatePicker
                                    value={selectedDateFrom}
                                    onChange={this.handleDateFromChange}
                                    leftArrowIcon={<ArrowLeft/>}
                                    rightArrowIcon={<ArrowRight/>}
                                    label={'C:'}
                                    format="dd-MM-yyyy"
                                    required
                                    // error={isDateFromError}
                                />

                                <span>&#8195;</span>

                                <DatePicker
                                    value={selectedDateTo}
                                    onChange={this.handleDateToChange}
                                    leftArrowIcon={<ArrowLeft/>}
                                    rightArrowIcon={<ArrowRight/>}
                                    label={'По:'}
                                    format="dd-MM-yyyy"
                                    required
                                    minDate={selectedDateFrom}
                                    // minDateMessage='Должна быть не меньше даты начала'
                                    helperText={dateToHelper}
                                    // error={isDateToError}
                                />
                            </MuiPickersUtilsProvider>

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

                            <TextField
                                value={place}
                                margin="dense"
                                id="place"
                                label="Город/Место"
                                type="name"
                                onChange={this.handleFieldChange}
                            />

                            <span>&#8195;</span>

                            <TextField
                                value={country}
                                margin="dense"
                                id="country"
                                label="Страна"
                                type="name"
                                onChange={this.handleFieldChange}

                            />

                            <div>
                                <FormControl className={classes.covering}>
                                    <InputLabel htmlFor="covering">Покрытие</InputLabel>
                                    <Select
                                        value={covering}
                                        onChange={this.handleCovering}
                                        inputProps={{
                                            name: 'covering',
                                            id: 'coveringID',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>(Пусто)</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Натуральная трава </MenuItem>
                                        <MenuItem value={20}>Искусственная трава (улица)</MenuItem>
                                        <MenuItem value={30}>Искусственная трава (зал)</MenuItem>
                                        <MenuItem value={40}>Паркет (зал)</MenuItem>
                                        <MenuItem value={50}>Песок (улица)</MenuItem>
                                        <MenuItem value={60}>Песок (зал)</MenuItem>
                                        <MenuItem value={70}>Искусственное (зал)</MenuItem>
                                        <MenuItem value={80}>Другое</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <FormControl className={classes.divisions}>
                                <InputLabel htmlFor="select-multiple-chip">Дивизионы</InputLabel>
                                <Select
                                    multiple
                                    value={divisions}
                                    onChange={this.handleChange}
                                    input={<Input id="select-multiple-chip"/>}
                                    renderValue={selected => (
                                        <div className={classes.chips}>
                                            {selected.map(value => (
                                                <Chip key={value} label={value} className={classes.chip}/>
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {names.map(name => (
                                        <MenuItem key={name} value={name} style={this.getStyles(name, this)}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <div>
                                <FormControl className={classes.format}>
                                    <InputLabel htmlFor="format">Формат</InputLabel>
                                    <Select
                                        value={format}
                                        onChange={this.handleCovering}
                                        inputProps={{
                                            name: 'format',
                                            id: 'formatID',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>(Пусто)</em>
                                        </MenuItem>
                                        <MenuItem value={10}>5x5</MenuItem>
                                        <MenuItem value={20}>7x7</MenuItem>
                                        <MenuItem value={30}>4x4</MenuItem>
                                        <MenuItem value={40}>Другое</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={toggleClose} color="primary">
                                Отмена
                            </Button>
                            <Button onClick={this.handleAddTournament} color="primary">
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

AddTournament.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleClose: PropTypes.func.isRequired,
        //from store
    pushNewTournament: PropTypes.func,
    user: PropTypes.object,
};
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        pushNewTournament: (tournament) => dispatch(pushNewTournament(tournament))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(AddTournament));
