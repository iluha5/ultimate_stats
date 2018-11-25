import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {loadBearer, loadUsersAndLogin} from "../AC";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/es/styles/index";
import Typography from '@material-ui/core/Typography';
import AlarmSnackBar from "./AlarmSnackBar";
import {WRONG_USER} from "../constants";
import Mode from "./Mode";
import {Route, Switch} from "react-router-dom";
import Scorekeeper from "./Scorekeeper";
import {push, replace} from 'react-router-redux';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoginFailedOpen: false,
            isButtonClick: false
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
            isLoginFailedOpen: false,
        });
    };

    handleButtonClick = event => {
        console.log('----- click');
        event.preventDefault();

        const {loadUsersAndLogin, loadBearer} = this.props;
        const {email, password} = this.state;

        if (email && password) {
            // debugger;
            loadBearer(); // just for immitation
            loadUsersAndLogin({email, password});
        }

        const {user} = this.props;

        this.setState({
            isButtonClick: true
        })

    };

    static getDerivedStateFromProps(props, state) {
        // debugger;
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

    // componentDidMount() {
        // const {loadBearer, user} = this.props;
        // loadBearer();
    // }

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
                        onClick={this.handleButtonClick}
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
    mapStateToProps = (state, ownProps) => {
        return {
            bearer: state.bearer,
            user: state.user
        };
    };

const
    mapDispatchToProps = (dispatch) => {
        return ({
            loadBearer: () => dispatch(loadBearer()),
            loadUsersAndLogin: (user) => dispatch(loadUsersAndLogin(user))
        });
    };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
