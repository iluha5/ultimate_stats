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
            test: 'default'
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleButtonClick = event => {
        console.log('----- click');

        const {loadUsersAndLogin} = this.props;
        const {email, password} = this.state;

        if (email && password) {
            // debugger;
            loadUsersAndLogin({email, password});
        }

        this.setState({
            isLoginFailedOpen: true,
            test: 'otstoy'
        })
    };

    componentDidMount() {
        const {loadBearer} = this.props;
        loadBearer();
    }

    getBody() {
        const {user, classes} = this.props;
        let toRender = [];
        // debugger;

        if (JSON.stringify(user) === '{}' || user === WRONG_USER) {
            toRender.push(
                <form className={classes.container} noValidate autoComplete="off">
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
                    >
                        Войти
                    </Button>
                </form>
            )
        }

        if (user === WRONG_USER) {
            toRender.push(
                <AlarmSnackBar isOpen={this.state.isLoginFailedOpen} message={'Не верный логин или пароль!'}/>
            )
        }

        if (user && JSON.stringify(user) !== '{}' && user !== WRONG_USER) {
            push('/network/keeper');
            // toRender.push(
            //     <Switch>
            //         <Route path='/network/keeper' component={Scorekeeper}/>
            //     </Switch>
            // )

        }

        return toRender;

    }


    render() {
        const {classes, user} = this.props;

        return (
            <div>
            {this.getBody()}
            </div>);

            {/*<form className={classes.container} noValidate autoComplete="off">*/}
                {/*<Typography variant="h5" component="h2">*/}
                    {/*Вход в сетевой режим*/}
                {/*</Typography>*/}
                {/*<TextField*/}
                    {/*id="outlined-email-input"*/}
                    {/*label="Email"*/}
                    {/*className={classes.textField}*/}
                    {/*type="email"*/}
                    {/*name="email"*/}
                    {/*autoComplete="email"*/}
                    {/*margin="normal"*/}
                    {/*variant="outlined"*/}
                    {/*onChange={this.handleChange('email')}*/}
                {/*/>*/}
                {/*<TextField*/}
                    {/*id="outlined-password-input"*/}
                    {/*label="Password"*/}
                    {/*className={classes.textField}*/}
                    {/*type="password"*/}
                    {/*autoComplete="current-password"*/}
                    {/*margin="normal"*/}
                    {/*variant="outlined"*/}
                    {/*onChange={this.handleChange('password')}*/}
                {/*/>*/}
                {/*<Button*/}
                    {/*variant="outlined"*/}
                    {/*className={classes.button}*/}
                    {/*onClick={this.handleButtonClick}*/}
                {/*>*/}
                    {/*Войти*/}
                {/*</Button>*/}
                {/*<AlarmSnackBar isOpen={this.state.isLoginFailedOpen} message={'Не верный логин или пароль!'}/>*/}
            {/*</form>*/}

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
