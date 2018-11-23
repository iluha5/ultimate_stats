import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {loadBearer} from "../AC";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/es/styles/index";
import Typography from '@material-ui/core/Typography';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    componentDidMount() {
        const {loadBearer} = this.props;
        loadBearer();
    }

    render() {
        const {classes} = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Typography variant="h5" component="h2">
                    Вход в сетевой режим
                </Typography>
                <TextField
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                />
                <Button variant="outlined" className={classes.button}>
                    Войти
                </Button>
            </form>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
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

const mapStateToProps = (state, ownProps) => {
    return {bearer: state.bearer};
};

const mapDispatchToProps = (dispatch) => {
    return ({
        loadBearer: () => dispatch(loadBearer())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(Login)
);
