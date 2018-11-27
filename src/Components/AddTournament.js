import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';


export default class AddTournament extends React.Component {
    // state = {
    //     open: false,
    // };

    // handleClickOpen = () => {
    //     this.setState({open: true});
    // };

    // handleClose = () => {
    //     this.setState({open: false});
    // };

    render() {
        const {isOpen, toggleClose} = this.props;

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
                        <DialogContentText>
                            Все поля кроме Название - необязательные, но очень рекомендуемые :)
                        </DialogContentText>
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
    toggleClose: PropTypes.func.isRequired
};