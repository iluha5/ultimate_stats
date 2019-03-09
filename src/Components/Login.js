import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {loadUsersAndLogin} from "../AC";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/es/styles/index";
import Typography from '@material-ui/core/Typography';
import AlarmSnackBar from "./AlarmSnackBar";
import {WRONG_USER} from "../constants";

class Login extends Component {
    state = {
        email: '',
        password: '',
        isLoginFailedOpen: false,
        isButtonClick: false
    };

    static getDerivedStateFromProps(props, state) {
        const {userData, isLoading} = props.user;
        const {isButtonClick} = state;

        if (userData && userData.role === WRONG_USER && isButtonClick && !isLoading) {
            return {
                isLoginFailedOpen: true,
                isButtonClick: false,

            }
        }
        return null;

    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
            isLoginFailedOpen: false,
        });
    };

    handleButtonClick = event => {
        event.preventDefault();

        const {loadUsersAndLogin} = this.props;
        const {email, password} = this.state;

        if (email && password) {
            // immitation only!
            // loadBearer(); // just for immitation
            loadUsersAndLogin({email, password});
        }

        this.setState({
            isButtonClick: true
        })

    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleButtonClick}>
                    <Typography variant="h5" component="h2">
                        Вход в сетевой режим
                    </Typography>
                    <TextField
                        id="outlined-email-input"
                        label="Email"
                        className={classes.textField}
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('email')}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('password')}
                    />
                    <Button
                        variant="outlined"
                        className={classes.button}
                        onClick={() => this.handleButtonClick}
                        type="submit"
                    >
                        Войти
                    </Button>
                    <AlarmSnackBar isOpen={this.state.isLoginFailedOpen} message={'Не верный логин или пароль!'}/>
                </form>
            </div>);

    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

const
    styles = theme => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '30px'
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
        },
        button: {
            margin: theme.spacing.unit,
        },

    });

const
    mapStateToProps = (state) => {
        return {
            bearer: state.bearer,
            user: state.user
        };
    };

const
    mapDispatchToProps = (dispatch) => {
        return ({
            // immitation only!
            //loadBearer: () => dispatch(loadBearer()),
            loadUsersAndLogin: (user) => dispatch(loadUsersAndLogin(user))
        });
    };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
