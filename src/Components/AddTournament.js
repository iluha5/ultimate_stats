import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ruLocale from 'date-fns/locale/ru';


export default class AddTournament extends React.Component {
    state = {
        selectedDate: new Date(),
    };

    // handleClickOpen = () => {
    //     this.setState({open: true});
    // };

    // handleClose = () => {
    //     this.setState({open: false});
    // };

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    render() {
        const {isOpen, toggleClose} = this.props;
        const {selectedDate} = this.state;

        return (
            <div>
                {/*<Button onClick={this.handleClickOpen}>Open form dialog</Button>*/}
                <Dialog
                    open={isOpen}
                    onClose={toggleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Добавление турнира</DialogTitle>
                    <DialogContent>
                        {/*<DialogContentText>*/}
                            {/*Все поля кроме Название - необязательные, но очень рекомендуемые :)*/}
                        {/*</DialogContentText>*/}
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                            <DatePicker
                                value={selectedDate}
                                onChange={this.handleDateChange}
                                leftArrowIcon={<ArrowLeft/>}
                                rightArrowIcon={<ArrowRight/>}
                                label={'C:'}
                                format="dd-MM-yyyy"
                            />
                            <span> </span>
                            <DatePicker
                                value={selectedDate}
                                onChange={this.handleDateChange}
                                leftArrowIcon={<ArrowLeft/>}
                                rightArrowIcon={<ArrowRight/>}
                                label={'По:'}
                                format="dd-MM-yyyy"
                            />
                        </MuiPickersUtilsProvider>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Название"
                            type="name"
                            fullWidth
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Название"
                            type="name"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={toggleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={toggleClose} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AddTournament.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleClose: PropTypes.func.isRequired,
};