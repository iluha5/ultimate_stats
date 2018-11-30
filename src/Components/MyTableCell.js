import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';

// We can inject some CSS into the DOM.
const styles = {
    root: {
        padding: '4px 0px 4px 10px'
    },
};

function ClassNames(props) {
    const { classes, children, className, ...other } = props;

    return (
        <TableCell className={classNames(classes.root, className)} {...other}>
            {children}
        </TableCell>
    );
}

ClassNames.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default withStyles(styles)(ClassNames);



{/*<TableCell className={classNames(classes.root, className)} {...other}>*/}
    {/*{children || 'class names'}*/}
{/*</TableCell>*/}